import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { PostTransaction } from './post-transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  base = environment.baseBackend;
  constructor(private http: HttpClient) { }
  postTransaction(data: PostTransaction): Observable<PostTransaction> {
    return this.http.post<PostTransaction>(`${this.base}transaction`, data);
  }
}
