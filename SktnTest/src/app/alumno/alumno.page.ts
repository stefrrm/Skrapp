import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import { BarcodeScannerService } from '../service/barcode-scanner.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  user = '';
  nombreAlumno: string = '';
  institucion: string = '';
  emailAlumno: string = '';
  scannedData: any;

  constructor(
    private authService: AuthserviceService,
    private route: ActivatedRoute,
    private activeroute: ActivatedRoute,
    private barcodeScannerService: BarcodeScannerService
  ) { }

  ngOnInit() {
    this.user = history.state.id;
    if (this.user) {
      const idAlumno = Number(this.user);
      this.cargarDatosAlumno(idAlumno);
    } else {
      console.error("ID de profesor no encontrado");
    }
  }

  cargarDatosAlumno(idAlumno: number) {
    this.authService.obtenerDatosAlumno(idAlumno).subscribe(
      (data: any) => {
        if (data && data.alumno) {
          this.nombreAlumno = data.alumno.nombre;
          this.institucion = data.alumno.institucion;
          this.emailAlumno = data.alumno.email;
        } else {
          console.error("No se encontró información del alumno");
        }
      },
      error => {
        console.error("Error al obtener los datos del alumno", error);
      }
    );
  }

  scan() {
    this.barcodeScannerService.scanCode().then(data => {
      console.log('Resultado del escaneo:', data);
    }).catch(error => {
      console.log('Error en el escaneo:', error);
    });
  }


}
