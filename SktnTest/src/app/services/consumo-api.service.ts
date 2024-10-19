import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumoAPIService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  apiURL = "http://127.0.0.1:5000"



  constructor(private http: HttpClient) { }

  // Método para el login
  login(user: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/home`, { user, password });
  }

  // Obtener profesores
  getProfesores(): Observable<any> {
    return this.http.get(`${this.apiURL}/profesores`);
  }

  // Obtener cursos de un profesor
  getCursosProfesor(profesorId: number): Observable<any> {
    return this.http.get(`${this.apiURL}/profesores/${profesorId}/cursos`);
  }

  // Obtener alumnos de un curso
  getAlumnosCurso(profesorId: number, cursoId: number): Observable<any> {
    return this.http.get(`${this.apiURL}/profesores/${profesorId}/cursos/${cursoId}/alumnos`);
  }

}
