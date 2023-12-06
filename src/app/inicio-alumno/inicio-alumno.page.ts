import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ValidarService } from '../validar.service'; // Importa el servicio
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController } from '@ionic/angular';


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
  correoAlumno:any;
  nombreAsignatura:any;


  constructor(private route: ActivatedRoute, private router: Router, private validarService: ValidarService, private toastController: ToastController) {this.seccionesAlumno = []; }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("PARAMS", params, this.validarService.nombreUsuario);
      this.nombreUsuario = this.validarService.nombreUsuario;
      this.seccionesAlumno = this.validarService.getSeccionesAlumno();
      //yo
      this.AlumnoId = this.validarService.idAlumno;
      this.seccionesId = this.validarService.idSecciones;
      this.correoAlumno = this.validarService.correoAlumno;
      this.nombreAsignatura = this.validarService.nombreAsignaturas
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
  
          // Obtén la asignatura según el idSeccion
          this.validarService.getAsignaturaPorIdSeccion(this.validarService.idAlumno, valor)
            .subscribe(nombreAsignatura => {
              if (nombreAsignatura) {
                // Guarda la asistencia en el servidor
                this.validarService.guardarAsistencia({
                  nombreUsuario: this.validarService.nombreUsuario,
                  AlumnoId: this.validarService.idAlumno,
                  correoAlumno: this.validarService.correoAlumno,
                  idSeccion: valor,
                  nombreAsignatura: nombreAsignatura,
                  hora: new Date().toISOString(),
                });
                this.router.navigate(['/inicio-alumno']);
                this.mostrarAlerta("Asistencia guardada con éxito");
              } else {
                this.router.navigate(['/login']);
                this.mostrarAlerta("No se puede acceder. No se encontró la asignatura para el idSeccion proporcionado.");
              }
            });
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

  verAsis(){
    this.router.navigate(['/muestrasis']);
  }

  async mostrarAlerta(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000, // duración en milisegundos
      position: 'top', // posición: 'top', 'bottom', 'middle'
      color: 'success', // color: 'primary', 'secondary', 'danger', 'success', etc.
    });
    toast.present();
  }
}