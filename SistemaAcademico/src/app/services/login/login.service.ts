import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { LoginRequest } from '../login/LoginRequest';
import { UsuarioService } from '../usurio/usuario.service';
import { Usuario } from '../../shared/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  errorMessage: string = '';
  usuario?: Usuario;
  
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient, private userService: UsuarioService) {
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

          // Llamada al servicio de usuario para obtener más detalles y almacenarlos
          this.userService.getUser(credentials.cedula).subscribe({
            next: (usuario) => {
              this.usuario = usuario;
              sessionStorage.setItem("usuarioInfo", JSON.stringify(usuario));
            },
            error: (error) => {
              this.errorMessage = error;
              console.error('Error al obtener el usuario:', error);
            },
            complete: () => console.log('Petición para obtener usuario completada')
          });
        }
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("usuarioInfo");
      this.currentUserData.next("");
      this.currentUserLoginOn.next(false);
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error('Error en la solicitud, intente nuevamente más tarde.'));
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
