import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/'; // URL de tu backend en Spring Boot

  constructor(private http: HttpClient, private router: Router) { }

  // Método para hacer login, recibe un objeto con las credenciales del usuario
  login(credentials: { cedula: string, password: string }): Observable<any> {
    // Se hace la petición POST al backend con las credenciales
    return this.http.post(`${this.baseUrl}login`, credentials);
  }
}
