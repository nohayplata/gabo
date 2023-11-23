import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ValidarService } from '../validar.service';

@Component({
  selector: 'app-paginaqr',
  templateUrl: './paginaqr.page.html',
  styleUrls: ['./paginaqr.page.scss'],
})
export class PaginaqrPage implements OnInit {
  idSeccion: any;
  qrCodeData: any;
  datosAlumno: any;
  asistenciaAlumnos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private validarService: ValidarService
  ) {
    this.obtenerAsistencia()
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idSeccion = params['idSeccion'];
      this.generateQRCode();
    });

  }

  generateQRCode() {
    this.qrCodeData = this.validarService.generateQRCode(this.idSeccion);
  }

  obtenerAsistencia() {
    this.validarService.getAsistencia().subscribe((asistencia: any[]) => {
      this.asistenciaAlumnos = asistencia;
      console.log(this.asistenciaAlumnos);
      
    });
  }

  refresh(){
    this.obtenerAsistencia()
  }
}


