import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

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

    // suspender estudiante por numero de cedula
    suspendEstudiante(cedula: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/api/adminop/estudiante/suspender/${cedula}`, {});
    }

    // activar estudiante por numero de cedula
    activateEstudiante(cedula: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/api/adminop/estudiante/activar/${cedula}`, {});
    }

    // traer las configuraciones de horas
    getConfigHoras(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/adminop/horariosConfig");
    }

    // traer distributivos por id de ciclo e id del curso
    getDistributivos(curso: number): Observable<any> {
        if (!curso) {
            return of([]); // Devuelve una lista vacía si el curso es nulo o vacío
        }
        return this.http.get<any>(`${this.apiUrl}/api/adminop/distributivos/5/curso/${curso}`);
    }

    // Agregar horario
    addHorario(requestBody: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/api/adminop/horario", requestBody);
    }

    // traer inscripciones pendientes
    getInscripcionesPendientes(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/adminop/inscripciones/pendientes");
    }

    // traer una inscripción por cedula
    getInscripcionByCedula(cedula: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/general/controller/inscripcion/${cedula}`);
    }

    // obtener docentes
    getDocentes(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/adminop/docentes");
    }

    // aceptar inscripción
    acceptInscripcion(requestBody: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + "/api/adminop/inscripcion/aceptar", requestBody);
    }

    // DASHBOARD --------------------------------------------------------------
    // cantidad de estado de instripciones
    getInscripcionesCount(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/adminop/dashboard/inscripciones");
    }

    // cantidad de estado de matricula
    getMatriculasCount(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/adminop/dashboard/matriculas");
    }

    // cntidad de estudiantes por curso/aula
    getEstudiantesPorCurso(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/adminop/dashboard/estudiantes/aulas");
    }

}
