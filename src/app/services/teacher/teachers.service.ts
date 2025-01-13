import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  // Obtener materias del docente
  getMaterias(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/docente/materias");
  }

  // Obtener el horario por docente
  getHorario(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/docente/horario");
  }

}
