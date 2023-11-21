import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ValidarService } from '../validar.service'; // Importa el servicio
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})


export class InicioAlumnoPage implements OnInit {

  nombreUsuario: string = "";
  secciones: any[] = [];
  public seccionesAlumno: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private validarService: ValidarService) {this.seccionesAlumno = []; }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("PARAMS", params, this.validarService.nombreUsuario);
      this.nombreUsuario = this.validarService.nombreUsuario;
      this.seccionesAlumno = this.validarService.getSeccionesAlumno();
      console.log('Secciones del alumno:', this.seccionesAlumno);
    });
  }

  async escanearCodigo() {
  // Check camera permission
  // This is just a simple example, check out the better checks below
  await BarcodeScanner.checkPermission({ force: true });

  // make background of WebView transparent


  //@ts-ignore
  document.querySelector('body').classList.add('scanner-active');

  const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

  // if the result has content
  if (result.hasContent) {
    console.log(result.content); // log the raw scanned content}
    //@ts-ignore
    document.querySelector('body').classList.remove('scanner-active');
    this.validarService.guardarResultadoEscaneo(result.content);

    //fechas
    const fechaActual = this.validarService.obtenerFechaActual();
    this.validarService.guardarFechaActual(fechaActual);

    this.router.navigate(['/asistencia'])
  }
  }

  irAsistencia(){
    this.router.navigate(['/asistencia'])
  }
}
