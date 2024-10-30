import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: FormGroup;

  constructor(private router: Router, private alertController: AlertController, private authService: AuthserviceService) {
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
    const { user, pass } = this.usuario.value;  // Desestructurar para mayor claridad

    this.authService.login(user, pass).subscribe({
      next: (response) => {
        // Si el login es exitoso
        if (response.role) {
          this.authService.setAuthenticated(true, response.role); // Guardar el estado y el rol
          // Redirigir según el rol
          if (response.role === 'profesor') {
            this.router.navigate(['/profesor']);
          } else if (response.role === 'alumno') {
            this.router.navigate(['/alumno']);
          } else {
            this.presentAlert("Error", "Rol no reconocido");
          }
        } else {
          this.presentAlert("Error Login", "Usuario o contraseña incorrectos");
        }
      },
      error: (error) => {
        // Si hay un error en el login
        this.presentAlert("Error Login", "Usuario o contraseña incorrectos");
      }
    });
  }



  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


}