import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface News {
  id?: number;
  title: string;
  date: string;
  summary: string;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:8080/noticias';

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  createNews(news: News): Observable<News> {
    return this.http.post<News>(this.apiUrl, news);
  }

  updateNews(id: number, news: News): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}/${id}`, news);
  }

  deleteNews(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
