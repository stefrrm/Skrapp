import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.page.html',
  styleUrls: ['./generarqr.page.scss'],
})
export class GenerarqrPage implements OnInit {
  cursoId: number = 0;
  nombreCurso: string = '';
  codigo: string = '';
  seccion: string = '';
  institucion: string = '';
  fechaHora: string = '';
  nombreProfesor: string = '';
  alumnos: any[] = [];
  codigoQR: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.cursoId = navigation.extras.state['cursoId'];
      this.nombreCurso = navigation.extras.state['nombreCurso'];
      this.codigo = navigation.extras.state['codigo'];
      this.seccion = navigation.extras.state['seccion'];
      this.institucion = navigation.extras.state['institucion'];
      this.fechaHora = navigation.extras.state['fechaHora'];
      this.nombreProfesor = navigation.extras.state['nombreProfesor'];
    }
  }

  ngOnInit() {
    this.codigoQR = `Curso: ${this.nombreCurso}, Profesor: ${this.nombreProfesor}`;
  }
}