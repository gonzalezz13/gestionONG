import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Activity {
  id?: number;
  title: string;
  description: string;
  location: string;
  activityDate: string;
  maxParticipants: number;
  currentParticipants?: number;
  availablePlaces?: number;
  category: string;
  status?: string;
  imageUrl: string;
  difficulty: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:8080/activities';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl);
  }

  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/${id}`);
  }

  getProposals(): Observable<Activity[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Activity[]>(`${this.apiUrl}/propuestas`, { headers });
  }

  createActivity(activity: any, isProposal: boolean = false): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    let activityDate = activity.activityDate;
    if (activityDate && activity.activityTime) {
      activityDate = `${activityDate}T${activity.activityTime}:00`;
    }

    const activityData = { 
      ...activity, 
      activityDate,
      status: (this.authService.isAdmin() && !isProposal) ? 'programada' : 'propuesta' 
    };
    
    return this.http.post<any>(this.apiUrl, activityData, { headers });
  }

  updateActivity(id: number, activity: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    let activityDate = activity.activityDate;
    if (activityDate && activity.activityTime) {
      activityDate = `${activityDate}T${activity.activityTime}:00`;
    }

    const activityData = { 
      ...activity, 
      activityDate,
      status: activity.status || 'programada'
    };
    
    return this.http.put<any>(`${this.apiUrl}/${id}`, activityData, { headers });
  }

  deleteActivity(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  enroll(userId: number, activityId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    const enrollmentData = {
      id: { userId, activityId },
      user: { id: userId },
      activity: { id: activityId },
      status: 'inscrito'
    };
    
    return this.http.post<any>('http://localhost:8080/enrollments', enrollmentData, { headers });
  }

  getUserEnrollments(userId: number): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`http://localhost:8080/enrollments/user/${userId}`, { headers });
  }

  unenroll(userId: number, activityId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`http://localhost:8080/enrollments/${userId}/${activityId}`, { headers });
  }

  getEnrollmentsByActivity(activityId: number): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`http://localhost:8080/enrollments/activity/${activityId}`, { headers });
  }
}
