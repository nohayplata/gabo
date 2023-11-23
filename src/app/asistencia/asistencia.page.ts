import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidarService } from '../validar.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  idAlumno:any;
  idSeccion: any;
  datosAsistencia: any;
  nombreUsuario: string = "";
  qrdato:any;
  correoAlumno:any;
  fechaHora: any;
  formattedDate:any;

  constructor(private route: ActivatedRoute, private validarService: ValidarService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.datosAsistencia = params;
      this.nombreUsuario = this.validarService.nombreUsuario;
      this.idAlumno = this.validarService.idAlumno;
      this.correoAlumno = this.validarService.correoAlumno;
      this.qrdato = this.validarService.resultadoEscaneo;

      console.log('Datos de asistencia:1', this.datosAsistencia, params);
    });
  }
  
  ionViewWillEnter(){
    const fechaLocal = new Date();

    // Ajusta la zona horaria a GMT-3
    fechaLocal.setUTCHours(fechaLocal.getUTCHours() - 3);

    // Formatea la fecha como "año/mes/dia hora"
    this.formattedDate = fechaLocal.getFullYear() + '/' + 
                        ('0' + (fechaLocal.getMonth() + 1)).slice(-2) + '/' + 
                        ('0' + fechaLocal.getDate()).slice(-2) + ' ' + 
                        ('0' + fechaLocal.getHours()).slice(-2) + ':' + 
                        ('0' + fechaLocal.getMinutes()).slice(-2) + ':' + 
                        ('0' + fechaLocal.getSeconds()).slice(-2);   
  }

  obtenerDatosAsistencia() {
    this.validarService.guardarInfoAlumno(this.idSeccion).subscribe(
      (datos) => {
        this.datosAsistencia = datos;
        console.log('Datos de asistencia1:', this.datosAsistencia);
        // Puedes hacer lo que quieras con los datos de asistencia, por ejemplo, mostrarlos en la interfaz.
      },
      (error) => {
        console.error('Error al obtener datos de asistencia:', error);
      }
    );
  }

  
}
