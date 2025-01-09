import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpAdminService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  // traer matriculas pendientes
  getMatriculasPendientes(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/adminop/matriculas/pendientes");
  }

  // aceptar una matricula
  acceptMatricula(requestBody: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/adminop/matricula/aceptar`, requestBody);
  }

  // obtener cursos por nombre del grado
  getCursosByGrado(grado: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/general/controller/cursos/${grado}`);
  }

  // traer cursos
  getCursos(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/adminop/cursos");
  }

  // agregar cursos
  addCurso(requestBody: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/adminop/curso", requestBody);
  }

  // traer estudiantes matriculados
  getEstudiantesMatriculados(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/adminop/estudiantes/matriculados");
  }

}
