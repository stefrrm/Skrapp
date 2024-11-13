import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  constructor(private barcodeScanner: BarcodeScanner, private platform: Platform) { }

  scanCode() {
    if (this.platform.is('cordova')) {
      // Escaneo en dispositivo real o emulador
      return this.barcodeScanner.scan().then(barcodeData => {
        console.log('Datos escaneados:', barcodeData);
        return barcodeData;
      }).catch(err => {
        console.error('Error al escanear el código:', err);
        throw err;
      });
    } else {
      // Simulación para navegador
      const mockData = { text: "testeo skanner", format: "QR_CODE", cancelled: false };
      console.log('Simulación de datos de escaneo:', mockData);
      return Promise.resolve(mockData);
    }
  }
}
