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


}