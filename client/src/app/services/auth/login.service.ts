import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { LoginData } from './loginData';
import { Observable, throwError, catchError, BehaviorSubject, tap } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  currentLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({ id: 0, user_name: '', name: '', pwd: '', rol_id: 0, state: false });
  private loginOn = signal<boolean>(false);
  private loginRole = signal<number>(0);
  private loginUser = signal<User>({ id: 0, user_name: '', name: '', pwd: '', rol_id: 0, state: false });
  public getLoginOn = computed(() => this.loginOn());
  public getLoginRole = computed(() => this.loginRole());
  public getLoginUser = computed(() => this.loginUser());
  base = environment.baseBackend;

  constructor(private http: HttpClient) {
    const userDataString: string | null = localStorage.getItem("user");
    if (userDataString !== null) {
      const userData: User = JSON.parse(userDataString);
      this.loginRole.set(userData.rol_id);
      this.loginUser.set(userData);
    }
    this.loginOn.set(localStorage.getItem("user") ? true : false);

  }


  logout() {
    localStorage.removeItem("user");
    this.loginOn.set(false);
    this.loginRole.set(0);
  };

  login(credentials: LoginData): Observable<User> {
    /*  "../assets/data.json"*/
    const { userName, password } = credentials;
    return this.http.get<User>(`${this.base}user/${userName}/${password}`).pipe(
      tap((userData: User) => {
        localStorage.setItem("user", JSON.stringify(userData));
        this.loginOn.set(true);
        this.loginRole.set(userData.rol_id);
        this.loginUser.set(userData);
        this.currentUserData.next(userData);
        this.currentLogin.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Ha ocurrido un error de red. Por favor, inténtelo de nuevo.'));
    } else {
      return throwError(() => new Error('Error. Por favor, inténtelo de nuevo.'));
    }
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentLogin.asObservable();
  }

}
