import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../login/usuario';
import { enviroment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  getUser(cedula:string):Observable<Usuario>{
    return this.http.get<Usuario>(enviroment.urlApi+"user/"+cedula).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(userRequest:Usuario):Observable<any>{
    return this.http.put(enviroment.urlApi+"user", userRequest).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
