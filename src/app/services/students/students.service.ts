import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    // cambiar la contraseña
    changePassword(data: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + "/api/general/controller/cambiar/contrasena", data);
    }

    // Obtener materias del estudiante
    getMaterias(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/estudiante/materias");
    }

    getMateriaById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/estudiante/materia/${id}`);
    }

    getAssignmentById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/estudiante/asignacion/${id}`);
    }

    updateAssignment(data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/api/estudiante/asignacion/entrega`, data);
    }

    getUser(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/general/controller/usuario");
    }

    getHorarios(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/estudiante/horario");
    }

    getAttendance(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/estudiante/asistencias");
    }

    getAttendanceByDistributivo(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/estudiante/asistencia/${id}`);
    }

    // visualizar calificaciones por distributivo
    getGradesByDistributivo(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/estudiante/calificaciones/${id}`);
    }

    // visualizar calificaciones general
    getGrades(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/estudiante/notas`);
    }

    // traer principal
    getPrincipal(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/estudiante/dashboard");
    }

    // traer las asignaciones pendientes al dashboard
    getAssignmentsDash(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/estudiante/dashboard/entregas");
    }

}