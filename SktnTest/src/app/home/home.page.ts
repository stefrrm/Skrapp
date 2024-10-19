import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { ConsumoAPIService } from '../services/consumo-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: FormGroup;

  constructor(private apiService: ConsumoAPIService, private router: Router, private alertController: AlertController, private authService: AuthserviceService) {
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
    console.log(this.usuario.valid); // Verifica si el formulario es válido
    console.log("Botón de ingreso presionado");
    if (this.usuario.valid) {
      const user = this.usuario.value.user;
      const pass = this.usuario.value.pass;
      this.login(user, pass);
    } else {
      this.presentAlert("Error", "Debe completar los campos de usuario y contraseña");
    }
  }

  login(user: string, password: string) {
    this.apiService.login(user, password).subscribe(response => {
      if (response.tipoPerfil === 1) {
        this.router.navigate(['/profesor']);
      } else if (response.tipoPerfil === 2) {
        this.router.navigate(['/alumno']);
      }
    }, error => {
      console.error("Error en el login", error);
      this.presentAlert("Error Login", "Credenciales incorrectas o error del servidor");
    });
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
}