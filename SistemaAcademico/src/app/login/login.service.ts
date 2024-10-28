import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private _httpClient:HttpClient) { }

  private baseUrl = "/login"

  fetchAllUsers() {
    return this._httpClient.get<Login[]>(this.baseUrl)
  }

  loginUser(login:Login) {
    return this._httpClient.post<Login>(this.baseUrl, login)   
  }
}
