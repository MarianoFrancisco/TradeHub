import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { RegisterData } from './registerData';
import { Coin } from '../../models/coin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  constructor(private http: HttpClient) { }
  base = environment.baseBackend;
  createUser(data: RegisterData): Observable<any> {
    return this.http.post<any>(`${this.base}user`, data);
  }
  getCoin(id:number): Observable<Coin> {
    return this.http.get<Coin>(`${this.base}coin/${id}`);
  }
}
