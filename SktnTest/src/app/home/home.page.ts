import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: FormGroup;

  constructor(private router: Router, private alertController: AlertController) {
    this.usuario = new FormGroup({
      user: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
    });
  }

  Ingreso() {
    let setData: NavigationExtras = {
      state: {
        id: this.usuario.value.user,
        pass: this.usuario.value.pass
      }
    };

    const loginMap: { [key: string]: string } = {
      'stefano:1234': '/profesor',
      'giamantovani:1234': '/profesor',
      'johnperez:4321': '/alumno',
      'walter:4321': '/alumno',
      'charlesmariano:6969': '/profesor'
    };

    const userPassKey = `${this.usuario.value.user}:${this.usuario.value.pass}`;


    if (loginMap[userPassKey]) {
      this.router.navigate([loginMap[userPassKey]], setData);
    } else {
      this.presentAlert("Error Login", "Usuario o contraseña son incorrectos");
    }
  }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Info Login',
      subHeader: titulo,
      message: mensaje,
      buttons: ['Action']
    });
    await alert.present();
  }

  ngOnInit() {

  }
}