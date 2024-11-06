import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { UsuarioRegistro } from './registroRequest';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  errorMessage: string = '';
  
  constructor(private http: HttpClient) {}

  registrarUsuario(credentials: UsuarioRegistro): Observable<any> {
    return this.http.post<any>(`${enviroment.urlHost}auth/register`, credentials).pipe(
        map((userData) => userData.token),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error('Error en la solicitud, intente nuevamente más tarde.'));
  }

}
