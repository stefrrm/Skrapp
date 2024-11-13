import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  constructor(private barcodeScanner: BarcodeScanner) { }

  scanCode() {
    return this.barcodeScanner.scan().then(barcodeData => {
      console.log('Datos escaneados:', barcodeData);
      return barcodeData;
    }).catch(err => {
      console.error('Error al escanear el código:', err);
      throw err;
    });
  }
}
