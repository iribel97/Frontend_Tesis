import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {environment} from '../../../enviroment/environment';

interface LoginRequest {
    cedula: string;
    password: string;
}

interface LoginResponse {
    token: string;
    rolUsuario: string;
    estadoUsuario: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl = `${environment.urlApi}/auth/login`;
    private refreshTokenUrl = `${environment.urlApi}/auth/refresh-token`;

    constructor(private http: HttpClient) {
    }

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.loginUrl, loginRequest)
            .pipe(
                map(response => {
                    // Guarda el token, estado del usuario y rol del usuario en localStorage
                    this.setToken(response.token);
                    this.setEstadoUsuario(response.estadoUsuario);
                    this.setRolUsuario(response.rolUsuario);
                    return response; // Se devuelve toda la respuesta en caso de necesitarla
                }),
                catchError(error => {
                    // Manejar errores (puede customizarlo si se desea)
                    throw error;
                })
            );
    }

    logout(): void {
        console.log('Cerrando sesión');
        // Elimina todos los datos relacionados al usuario de localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('estadoUsuario');
        localStorage.removeItem('rolUsuario');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token; // Verifica si existe un token en localStorage
    }

    // Guarda el token en localStorage
    setToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    // Obtiene el token desde localStorage
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    // Método para almacenar el estado del usuario
    setEstadoUsuario(estado: string): void {
        localStorage.setItem('estadoUsuario', estado);
    }

    // Método para obtener el estado del usuario
    getEstadoUsuario(): string | null {
        return localStorage.getItem('estadoUsuario');
    }

    // Método para almacenar el rol del usuario autenticado
    setRolUsuario(rol: string): void {
        localStorage.setItem('rolUsuario', rol);
    }

    // Método para obtener el rol del usuario autenticado
    getRolUsuario(): string | null {
        return localStorage.getItem('rolUsuario');
    }

    // Verifica si el token está próximo a expirar (compara tiempos con menos de 5 minutos restantes)
    isTokenExpiringSoon(): boolean {
        const token = this.getToken();
        if (!token) return true;

        try {
            const expiresInMs = 1 * 60 * 60 * 1000 + 50 * 60 * 1000; // 1 hora y 50 minutos
            return expiresInMs < 5 * 60 * 1000; // ¿Menos de 5 minutos para expirar?
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return true; // En caso de error, asumimos que el token expira pronto
        }
    }

    // Método para refrescar el token en caso de expiración
    refreshToken(): Observable<string> {
        const token = this.getToken();
        if (!token) {
            throw new Error('No se encontró un token para renovar');
        }

        const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
        return this.http.post<{ token: string }>(this.refreshTokenUrl, null, {headers})
            .pipe(
                map(response => {
                    const newToken = response.token;
                    this.setToken(newToken); // Actualiza el token en localStorage
                    return newToken;
                }),
                catchError(error => {
                    console.error('Error al renovar el token:', error);
                    this.logout();
                    throw error;
                })
            );
    }

    // Obtener información adicional de usuario autenticado (ejemplo genérico)
    getInfoUserAuth(): Observable<any> {
        return this.http.get<any>(`${environment.urlApi}/`);
    }

    // Registro de representante u otro usuario
    registerRepresentative(data: any): Observable<any> {
        return this.http.post<any>(`${environment.urlApi}/auth/registro`, data);
    }
}