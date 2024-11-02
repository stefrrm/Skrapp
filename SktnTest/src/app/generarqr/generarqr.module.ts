import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarqrPageRoutingModule } from './generarqr-routing.module';

import { GenerarqrPage } from './generarqr.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarqrPageRoutingModule,
    QRCodeModule
  ],
  declarations: [GenerarqrPage]
})
export class GenerarqrPageModule { }
