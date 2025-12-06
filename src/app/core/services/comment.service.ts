import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = 'http://localhost:4000/api/comments';

  constructor(private http: HttpClient) {}

  create(comment: any): Observable<any> {
    return this.http.post(this.apiUrl, comment);
  }

  getByArtist(artistId: number, userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?artistId=${artistId}&userId=${userId}`);
  }

  update(id: string, comment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, comment);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
