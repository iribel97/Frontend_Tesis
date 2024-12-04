import {Inject, Injectable} from '@angular/core';
import { enviroment } from '../../../enviroment/enviroment';
import {HttpClient} from "@angular/common/http";
import {RegisterRepresentante} from "../../models/request/register.representante.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = enviroment.urlHost;

  constructor(private http: HttpClient) {}

  registerRepresentante(RegisterRepresentante: RegisterRepresentante) : Observable<RegisterRepresentante> {
    return this.http.post<any>(this.apiUrl + 'auth/register', RegisterRepresentante);
  }


}
