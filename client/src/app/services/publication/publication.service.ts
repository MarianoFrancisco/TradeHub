import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, BehaviorSubject, tap } from 'rxjs';
import { Publication } from '../../models/publication';
import { environment } from '../../../environments/environment.prod';
import { Category } from './category';
import { PublicationType } from './publicationType';
import { PostPublication } from '../../models/post-publication';
import { PublicationState } from './publicationState';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

 headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  //headers: HttpHeaders = new HttpHeaders({
    //"Content-Type": "multipart/form-data"
  //});
  constructor(private http: HttpClient) { }
  base = environment.baseBackend;
  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.base}publications`);
  }

  getPublication(id: string): Observable<Publication> {
    return this.http.get<Publication>(`${this.base}publication/${id}`);
  }

  getPublicationUserFilter(id: number, state: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.base}publication/user/${id}/filter/${state}`);
  }

  getPublicationUser(id: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.base}publication/user/${id}`);
  }

  deletePublication(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}publication/${id}`);
  }

  postPublication(data: PostPublication): Observable<any> {
    const formData = new FormData();
    formData.append('users_id', data.users_id.toString());
    formData.append('publication_type_id', data.publication_type_id.toString());
    formData.append('category_id', data.category_id.toString());
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    } else {
      formData.append('image', '');
    }
    formData.append('quantity', data.quantity.toString());
    formData.append('unity_price', data.unity_price.toString());
    //let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data; boundary=---------------------------1234567890123456789012345678');
    return this.http.post<any>(`${this.base}publication`, formData);
  }

  getReviewPublication(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.base}publication/review/1/3`);
  }

  reviewPublication(id: number, state: number): Observable<any> {
    return this.http.patch<any>(`${this.base}publication/review/${id}`, { state });
  }

  getCategory(id: number): Observable<string> {
    return this.http.get<string>(`${this.base}category/${id}/name`);
  }

  getPublicationState(id: number): Observable<string> {
    return this.http.get<string>(`${this.base}publication_state/${id}/name`);
  }

  getPublicateType(id: number): Observable<string> {
    return this.http.get<string>(`${this.base}publication_type/${id}/name`);
  }

  getAllPublicationType(): Observable<PublicationType[]> {
    return this.http.get<PublicationType[]>(`${this.base}publication_type`);
  }

  getAllPublicationState(): Observable<PublicationState[]> {
    return this.http.get<PublicationState[]>(`${this.base}publication_state`);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.base}category`);
  }
}
