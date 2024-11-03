import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { LoginRequest } from '../login/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) { 
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
      this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(enviroment.urlHost + "auth/login", credentials).pipe(
      tap((userData) => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem("token", userData.token);
          this.currentUserData.next(userData.token);
          this.currentUserLoginOn.next(true);
        }
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem("token");
      this.currentUserData.next("");
      this.currentUserLoginOn.next(false);
    }
  }

  private handleError(error: any): Observable<never> {
    // Manejo de errores
    throw error;
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }
}
