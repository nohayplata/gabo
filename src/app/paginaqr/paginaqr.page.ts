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
    this.obtenerAsistencia();
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
    const idSeccion = this.idSeccion; // Asegúrate de obtener el idSeccion de donde corresponda
    this.validarService.getAsistencia().subscribe((asistencia: any[]) => {
      // Filtra la asistencia por la sección actual y toma solo el registro más reciente de cada alumno
      const asistenciaFiltrada = this.filtrarAsistenciaReciente(asistencia, idSeccion);
      this.asistenciaAlumnos = asistenciaFiltrada;
      console.log(this.asistenciaAlumnos);
    });
  }

  filtrarAsistenciaReciente(asistencia: any[], idSeccion: string) {
    // Crea un objeto para almacenar el registro más reciente de cada alumno
    const asistenciaReciente: Record<string, any> = {};
  
    // Filtra y guarda el registro más reciente de cada alumno en el objeto
    asistencia.forEach(registro => {
      if (registro.idSeccion === idSeccion) {
        const idAlumno = registro.AlumnoId;
        if (!asistenciaReciente[idAlumno] || new Date(registro.hora) > new Date(asistenciaReciente[idAlumno].hora)) {
          asistenciaReciente[idAlumno] = registro;
        }
      }
    });
  
    // Convierte el objeto de registros más recientes a un array
    const resultado = Object.values(asistenciaReciente);
    return resultado;
  }

  refresh() {
    this.obtenerAsistencia();
  }
}



