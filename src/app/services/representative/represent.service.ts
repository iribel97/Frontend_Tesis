import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RepresentService {

    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    // Traer a los estudiantes por representante
    getEstudiantes(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/representante/estudiantes");
    }

    // Traer horarios por id del estudiante
    getHorarios(idEstudiante: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/representante/horario/estudiante/" + idEstudiante);
    }

    // Traer inscripciones por representante
    getInscripciones(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/representante/inscripcion");
    }

    // Inscribir a un estudiante
    inscribirEstudiante(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/api/representante/inscripcion/estudiante", data);
    }

    // Eliminar inscripción de un estudiante
    eliminarInscripcion(cedula: string): Observable<any> {
        return this.http.delete<any>(this.apiUrl + "/api/representante/inscripcion/" + cedula);
    }

    // Traer matriculas por representante
    getMatriculas(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/representante/matriculas");
    }

    // DASHBOARD --------------------------------------------
    // mostrar info general de cada uno de los estudiantes a quien representa
    getDashboard(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/estudiante/dashboard/representante");
    }

    // traer las asistencias de los estudiantes del representante
    getAsistencias(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/representante/asistencias");
    }

    // traer as asignaciones pendientes por cedula del estudiante
    getAsignaciones(cedula: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/estudiante/dashboard/representante/entregas/" + cedula);
    }

    // traer promedios generales de los estudiantes bajos
    getPromedios(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/representante/promedio");
    }

    // traer promedios por cedula de estudiante
    getPromedioByEst(cedula: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/estudiante/dashboard/representante/notas/" + cedula);
    }

    // traer los grados académicos
    getGrados(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/general/controller/grados");
    }

    // crear una matricula
    createMatricula(matricula: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/api/representante/matricula", matricula);
    }

    // eliminar una matricula por id
    deleteMatricula(id: number): Observable<any> {
        return this.http.delete<any>(this.apiUrl + "/api/representante/matricula/" + id);
    }

    // editar una matricula
    updateMatricula(matricula: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + "/api/representante/matricula", matricula);
    }

    // traer asistencias generales por cedula del studiante
    getAsistenciasByEst(cedula: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/api/estudiante/dashboard/representante/asistencias/" + cedula);
    }
}
