import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ActivatedRoute, Router, } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ValidarService } from '../validar.service'; // Importa el servicio


@Component({
  selector: 'app-paginaqr',
  templateUrl: './paginaqr.page.html',
  styleUrls: ['./paginaqr.page.scss'],
})
export class PaginaqrPage implements OnInit {

  idSeccion: any; // Asegúrate de inicializarlo o asignar un valor por defecto según tus necesidades
  qrCodeData: any;
  constructor(private route: ActivatedRoute, private validarService: ValidarService) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idSeccion = params['idSeccion'];
      this.generateQRCode();
    });
  }

  generateQRCode() {
    // Utiliza el método del servicio para generar el código QR
    this.qrCodeData = this.validarService.generateQRCode(this.idSeccion);
  }
}

