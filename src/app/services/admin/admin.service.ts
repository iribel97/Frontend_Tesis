import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/admin/usuarios");
  }

  deleteUserByCedula(cedula: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/admin/usuario/${cedula}`);
  }

  // traer todos los ciclos academicos
  getAllCiclos(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/general/controller/ciclos");
  }

  // obtener los distributivos por id de ciclo academico
  getDistributivosByCicloId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/admin/distributivo/ciclo/${id}`);
  }

  // obtener las materias
  getMaterias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/admin/materias`);
  }

  // obtener los grados
  getGrados(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/admin/grados`);
  }

  // Crear materia
  createMateria(materia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/admin/materia`, materia);
  }

  // obtener horarios por curso
  getHorariosByCurso(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/general/controller/horarios/${id}`);
  }

  // obtener cursos
  getCursos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/general/controller/cursos`);
  }

  // obtener sistema de calificaciones por ciclo
  getCalificacionesByCiclo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/admin/calificacion/ciclo/${id}`);
  }

  // obtener calendario academico por ciclo
  getCalendarioByCiclo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/admin/calendario/ciclo/${id}`);
  }

}

