import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as qrcode from 'qrcode-generator';

@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.page.html',
  styleUrls: ['./generarqr.page.scss'],
})
export class GenerarqrPage implements OnInit {

  nombreCurso = "";
  seccionCurso = "";
  idCurso = "";
  codigoCurso = "";
  qrDataURL = "";

  constructor(private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nombreCurso = this.router.getCurrentNavigation()?.extras.state?.['nombre'];
        this.seccionCurso = this.router.getCurrentNavigation()?.extras.state?.['seccion'];
        this.idCurso = this.router.getCurrentNavigation()?.extras.state?.['id'];
        this.codigoCurso = (this.router.getCurrentNavigation()?.extras.state?.['codigo']);
      }
    });
  }

  generadorQR() {
    if (this.idCurso) {
      const fechaActual = new Date().toISOString().split('T')[0];
      const data = `${this.codigoCurso}-${this.seccionCurso}-${fechaActual}`;

      let qr = qrcode(4, `L`);
      qr.addData(data);
      qr.make();
      this.qrDataURL = qr.createDataURL(4);
    }
  }

  ngOnInit() {
    this.generadorQR();
  }

}
