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
    return this.http.get<any>(this.apiUrl + "/api/admin/ciclos");
  }

  // obtener los distributivos por id de ciclo academico
  getDistributivosByCicloId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/admin/distributivo/ciclo/${id}`);
  }

}

