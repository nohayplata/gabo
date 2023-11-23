import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ValidarService } from '../validar.service'; // Importa el servicio
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})


export class InicioAlumnoPage implements OnInit {

  seccionesId: number[] = [];

  nombreUsuario: string = "";
  secciones: any[] = [];
  public seccionesAlumno: any[] = [];
  AlumnoId: any;
  fechaHora: any;

  constructor(private route: ActivatedRoute, private router: Router, private validarService: ValidarService) {this.seccionesAlumno = []; }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("PARAMS", params, this.validarService.nombreUsuario);
      this.nombreUsuario = this.validarService.nombreUsuario;
      this.seccionesAlumno = this.validarService.getSeccionesAlumno();
      //yo
      this.AlumnoId = this.validarService.idAlumno;
      this.seccionesId = this.validarService.idSecciones;
      //yo
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
      const rawContent = result.content;
      const indexOfColon = rawContent.indexOf(':');
      //@ts-ignore
      document.querySelector('body').classList.remove('scanner-active');
  
      if (indexOfColon !== -1) {
        const valor = rawContent.substring(indexOfColon + 1).trim();
        console.log(valor);
  
        // Parsea valor a un entero y compáralo con el array de IDs de secciones
        if (this.seccionesId.includes(parseInt(valor, 10))) {
          this.validarService.guardarResultadoEscaneo(valor);
          
          this.router.navigate(['/asistencia']);
        } else {
          this.router.navigate(['/login']);
          alert("No se puede acceder. El código de sección no coincide.");
          
        }
      } else {
        this.router.navigate(['/login']);
        console.log("No se encontró ':' en el contenido del escaneo");
      }
    }
  }
  

  irAsistencia(){
    this.router.navigate(['/asistencia'])
  }
}