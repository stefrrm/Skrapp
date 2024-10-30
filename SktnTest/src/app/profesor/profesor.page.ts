import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  user = '';  // Almacena el ID del profesor
  nombreProfesor = '';  // Almacena el nombre del profesor
  cursos: any[] = [];  // Almacena la lista de cursos del profesor

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private authService: AuthserviceService
  ) {
    // Suscribirse a los parámetros de la ruta
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.user = navigation.extras.state['id'];  // Obtener el ID del profesor
      }
    });
  }

  ngOnInit() {
    this.user = history.state.id;  // Toma el ID directamente del estado
    if (this.user) {
      const idProfesor = Number(this.user);
      this.cargarDatos(idProfesor);
    } else {
      console.error("ID de profesor no encontrado");
    }
  }

  cargarDatos(idProfesor: number) {
    this.authService.obtenerProfesorYCursos(idProfesor).subscribe(
      (data: any) => {
        if (data && data.profesor) {
          this.nombreProfesor = data.profesor.nombre;
          this.cursos = data.curso; // Asegúrate de usar `curso` o `cursos` como esté definido en tu API
        } else {
          console.error("No se encontró información del profesor");
        }
      },
      error => {
        console.error("Error al obtener los datos del profesor", error);
      }
    );
  }
}