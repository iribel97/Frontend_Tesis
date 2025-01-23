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
}
