import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

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

    updateAsistencias(asistencias: any[]): Observable<any> {
        return this.http.put(this.apiUrl + '/api/docente/asistencia', asistencias); // Ajusta la URL según el endpoint del backend
    }


    // obtener asistencias por id de distributivo y fecha "asistencias/{idDist}/{fecha}"
    getAsistencias(idDist: any, fecha: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/docente/asistencias/" + idDist + "/" + fecha, {});
    }

    addUnidad(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/docente/materia/contenido/unidad`, data);
    }

    updateUnidad(data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/api/docente/materia/contenido/unidad`, data);
    }

    addTema(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/docente/materia/contenido/tema`, data);
    }

    updateTema(data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/api/docente/materia/contenido/tema`, data);
    }

    // traer sistema de calificaión de acuerdo al id del distributivo
    getCalificaciones(idDistributivo: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/docente/materia/calificaciones/" + idDistributivo);
    }

    // Traer toda la info en caso de ser tutor de un curso
    getTutoria(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/docente/tutor/notas");
    }

    // traer el horario que debe ver el docente el día de hoy
    getHorarioHoy(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/docente/dashboard/horario/hoy");
    }

    // traer las asignaciones pendentes por revisar
    getAsignacionesPendientes(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/docente/dashboard/asignaciones/pendientes");
    }

    // traer promedios de los distributivos que imparte el docente
    getDashboardPromedios(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/docente/dashboard/promedios");
    }

    // traer los cursos que imparte el docente
    getCursos(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/docente/cursos");
    }

    addmaterialescursos(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/api/docente/materia/contenido/material", data);
    }

    Updatematerialescursos(data: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + "/api/docente/materia/contenido/material", data);
    }

    // subir una asignación
    uploadAsignacion(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/api/docente/materia/asignacion", data);
    }

    // actualizar una asignación
    updateAsignacion(data: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + "/api/docente/materia/asignacion", data);
    }

    // traer estudiantes por id del curso
    getEstudiantesCurso(idCurso: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/general/controller/estudiantes/curso/" + idCurso);
    }

    // traer citaciones
    getCitaciones(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/docente/citaciones");
    }

    // crear citación
    createCitacion(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/api/docente/citacion", data);
    }

    // cambiar estado de citación
    changeStateCitacion(idCitacion: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + "/api/docente/citacion/estado/" + idCitacion, {});
    }


}
