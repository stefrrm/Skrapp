import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.page.html',
  styleUrls: ['./generarqr.page.scss'],
})
export class GenerarqrPage implements OnInit {

  nombreCurso = "";
  seccionCurso = "";
  idCurso = "";

  constructor(private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nombreCurso = this.router.getCurrentNavigation()?.extras.state?.['nombre'];
        this.seccionCurso = this.router.getCurrentNavigation()?.extras.state?.['seccion'];
        this.idCurso = this.router.getCurrentNavigation()?.extras.state?.['id'];
        console.log(this.router.getCurrentNavigation()?.extras.state?.['codigo']);
      }
    });
  }

  ngOnInit() {
  }

}
