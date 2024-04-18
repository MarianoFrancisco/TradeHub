import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, throwError, catchError, BehaviorSubject, tap } from 'rxjs';
import { Publication } from '../../models/publication';
import { environment } from '../../../environments/environment.prod';
import { Category } from './category';
import { PublicationType } from './publicationType';
import { PostPublication } from '../../models/post-publication';
import { PublicationState } from './publicationState';
import { PostReport } from '../../models/post-report';
import { ReportPublication } from '../../models/report-publication';

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
  private publication = signal<Publication>({
    id: 0,
    users_id: 0,
    publication_type_id: 0,
    publication_state_id: 0,
    category_id: 0,
    title: "",
    description: "",
    image: "",
    quantity: 0,
    unity_price: 0,
    date: new Date()
  });
  private reportPublication = signal<ReportPublication[]>([]);
  public setPublication(publication: Publication) {
    localStorage.setItem("publication", JSON.stringify(publication));
    this.publication.set(publication);
  }
  public setReportPublication(reportPublication: ReportPublication[]) {
    localStorage.setItem("reportPublication", JSON.stringify(reportPublication));
    this.reportPublication.set(reportPublication);
  }
  public getPublicationView = computed(() => this.publication());
  public getReportPublicationView = computed(() => this.reportPublication());
  constructor(private http: HttpClient) {
    const publicationString: string | null = localStorage.getItem("publication");
    const reportPublicationString: string | null = localStorage.getItem("reportPublication");
    if (publicationString !== null) {
      const publication: Publication = JSON.parse(publicationString);
      this.publication.set(publication);
    }
    if (reportPublicationString !== null) {
      const reportPublication: ReportPublication[] = JSON.parse(reportPublicationString);
      this.reportPublication.set(reportPublication);
    }
  }
  base = environment.baseBackend;
  getPublications(id: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.base}publications/${id}`);
  }

  getReportPublication(id: number): Observable<ReportPublication[]> {
    return this.http.get<ReportPublication[]>(`${this.base}publication_reported/${id}`);
  }

  getPublicationsFilter(id: number, type: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.base}publications/${id}/filter/${type}`);
  }

  getPublication(id: number): Observable<Publication> {
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

  postReport(data: PostReport): Observable<PostReport> {
    return this.http.post<PostReport>(`${this.base}publication_reported`, data);
  }

  getReviewPublication(state: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.base}publication/review/${state}`);
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
