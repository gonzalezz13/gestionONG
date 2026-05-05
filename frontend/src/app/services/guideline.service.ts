import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Guideline {
  id?: number;
  title: string;
  description: string;
  category: string;
  size: string;
  date: string;
  iconColor: string;
  downloadUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GuidelineService {
  private apiUrl = 'http://localhost:8080/directrices';

  constructor(private http: HttpClient) {}

  getGuidelines(): Observable<Guideline[]> {
    return this.http.get<Guideline[]>(this.apiUrl);
  }

  createGuideline(guideline: Guideline): Observable<Guideline> {
    return this.http.post<Guideline>(this.apiUrl, guideline);
  }

  deleteGuideline(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
