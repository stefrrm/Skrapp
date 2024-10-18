import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  now = new Date();

  user = '';
  fecha = this.now.toLocaleString();

  cursos = [
    { id: 1, nombre: 'Aplicaciones Moviles', codigo: 'INF666', seccion: '033V' },
    { id: 2, nombre: 'Arquitectura', codigo: 'INF667', seccion: '014v' },
    { id: 3, nombre: 'Machine Learning', codigo: 'INF668', seccion: '055D' },
  ];

  constructor(private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras.state?.['id'];
        console.log(this.router.getCurrentNavigation()?.extras.state?.['id']);
      }
    })
  }

  ngOnInit() {
  }

}
