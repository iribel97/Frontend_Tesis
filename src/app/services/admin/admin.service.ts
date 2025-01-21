import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private readonly apiUrl = 'http://192.168.2.149:8080';

    constructor(private http: HttpClient) {
    }

    getAllUser(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/admin/usuarios");
    }

    // registrar usuarios
    registerUser(mappedDatta: String, request: any): Observable<any> {
        if (mappedDatta === 'Administrador') {
            return this.http.post<any>(`${this.apiUrl}/api/admin/registro/admin`,request);
        } else if (mappedDatta === 'Institucional') {
            return this.http.post<any>(`${this.apiUrl}/api/admin/registro/adminOp`, request);
        } else {
            return this.http.post<any>(`${this.apiUrl}/api/admin/registro/docente`, request);
        }
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

    // obtener materias por grado
    getMateriasByGrado(nombreGrado: String): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/admin/materias/${nombreGrado}`);
    }

    // obtener los grados
    getGrados(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/general/controller/grados`);
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

    getDocentes(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/admin/docentes`);
    }

    addDistributivo(requestBody: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/admin/distributivo`, requestBody);
    }

    // registrar evento en calendario academico
    addEvent(requestBody: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/admin/calendario`, requestBody);
    }

    // ENDPOINTS PARA EL DASHBOARD ---------------------------------------------------------------------
    // Obtener info del calendario académico
    getCalendario(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/general/controller/calendario`);
    }

    // Info de docentes asignados
    getDocentesAsignados(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/admin/dashboard/docentes`);
    }

    // Info de cantidad de usuarios
    getUsersCount(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/admin/dashboard/catidad/usuarios/rol`);
    }

    // Info de cantidad de estudiantes por grado
    getStudentsCountPerGrade(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/admin/dashboard/estudiantes/grado`);
    }

    // Info de asistencias por ciclo
    getAsistenciasByCiclo(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/docente/admin/dashboard/total/asistencias`);
    }

}

