import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TeachersService {

    private readonly apiUrl = 'http://192.168.2.149:8080';

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


}
