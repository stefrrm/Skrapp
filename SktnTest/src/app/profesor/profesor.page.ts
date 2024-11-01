import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  user = '';
  nombreProfesor = '';
  cursos: any[] = [];

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private authService: AuthserviceService
  ) {

    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.user = navigation.extras.state['id'];
      }
    });
  }

  ngOnInit() {
    this.user = history.state.id;
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
          this.cursos = data.curso;
        } else {
          console.error("No se encontró información del profesor");
        }
      },
      error => {
        console.error("Error al obtener los datos del profesor", error);
      }
    );
  }

  irAGenerarQR(curso: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        cursoId: curso.id,
        nombreCurso: curso.nombre,
        codigo: curso.codigo,
        seccion: curso.seccion,
        institucion: curso.institucion,
        fechaHora: new Date().toLocaleString(),  // Puedes formatear esto según sea necesario
        nombreProfesor: this.nombreProfesor
      }
    };
    this.router.navigate(['generarqr'], navigationExtras);
  }
}