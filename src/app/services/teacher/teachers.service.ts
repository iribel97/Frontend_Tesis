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

  // Obtener el contenido de una materia
  getContenido(idDistributivo: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/docente/materia/" + idDistributivo);
  }

  // traer estudiantes por id de distributivo
  getEstudiantes(idDistributivo: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/general/controller/estudiantes/" + idDistributivo);
  }

  // guardar asistencia
  saveAsistencia(requestBody: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/docente/asistencia", requestBody);
  }

  // obtener asistencias por id de distributivo y fecha "asistencias/{idDist}/{fecha}"
  getAsistencias(idDist: any, fecha: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/docente/asistencias/" + idDist + "/" + fecha, {});
  }

}
