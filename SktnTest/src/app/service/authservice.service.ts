import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private authenticated = false;
  private apiUrl = 'http://localhost:5000/login';  // Asegúrate de que la URL sea correcta
  private userRole: string | null = null;

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.authenticated;
  }

  // Método para hacer login
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Tipo de contenido que envías
    });

    // Envío de credenciales a la API
    return this.http.post<any>(this.apiUrl, { username, password }, { headers });
  }


  // Método para establecer el estado de autenticación y el rol
  setAuthenticated(value: boolean, role: string) {
    this.authenticated = value;
    this.userRole = role; // Guardamos el rol del usuario
  }

  getUserRole(): string | null {
    return this.userRole; // Retorna el rol del usuario
  }

  logout() {
    this.authenticated = false;
    this.userRole = null; // Reiniciar el rol al hacer logout
  }
}
