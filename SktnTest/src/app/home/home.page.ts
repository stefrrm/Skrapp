import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
    });
  }

  Ingreso() {
    const { email, password } = this.usuario.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response.role) {
          this.authService.setAuthenticated(true, response.role, response.id);
          this.navigateBasedOnRole(response.role, response.id);
        } else {
          this.presentAlert("Error Login", "Usuario o contraseña incorrectos");
        }
      },
      error: () => {
        this.presentAlert("Error Login", "Usuario o contraseña incorrectos");
      }
    });
  }

  navigateBasedOnRole(role: string, id: number) {
    if (role === 'profesor') {
      this.router.navigate(['/profesor'], { state: { id: id } });
    } else if (role === 'alumno') {
      this.router.navigate(['/alumno'], { state: { id: id } });
    } else {
      this.presentAlert("Error", "Rol no reconocido");
    }
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