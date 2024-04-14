import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { GenerateChat } from './generateChat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  constructor(private http: HttpClient) { }
  base = environment.baseBackend;
  createUser(data:GenerateChat): Observable<any> {
    return this.http.post<any>(`${this.base}`, data);
  }
}
