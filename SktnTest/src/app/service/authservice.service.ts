import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private authenticated = false;
  private apiUrl = 'http://localhost:5000';
  private userRole: string | null = null;
  private userId: number | null = null;

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.authenticated;
  }

  // Método para el login
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<any>(loginUrl, { email, password }, { headers }).pipe(
      catchError(err => {
        console.error('Error en el login', err);
        return throwError(err);
      })
    );
  }

  setAuthenticated(value: boolean, role: string, id: number) {
    this.authenticated = value;
    this.userRole = role;
    this.userId = id;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  getUserId(): number | null {
    return this.userId;
  }

  // Método datos del profesor y sus cursos
  obtenerProfesorYCursos(id: number): Observable<any> {
    const profesorUrl = `${this.apiUrl}/profesor/${id}`;
    return this.http.get<any>(profesorUrl).pipe(
      catchError(err => {
        console.error('Error al obtener datos del profesor', err);
        return throwError(err);
      })
    );
  }

  logout() {
    this.authenticated = false;
    this.userRole = null;
    this.userId = null;
  }
}