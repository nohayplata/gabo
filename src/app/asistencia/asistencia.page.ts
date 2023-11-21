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
  fechaActual:any;

  constructor(private route: ActivatedRoute, private validarService: ValidarService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.datosAsistencia = params;
      this.nombreUsuario = this.validarService.nombreUsuario;
      this.idAlumno = this.validarService.idAlumno;
      this.correoAlumno = this.validarService.correoAlumno;
      this.qrdato = this.validarService.resultadoEscaneo;

      this.fechaActual = this.validarService.obtenerFechaActual;

      console.log('Datos de asistencia:', this.datosAsistencia);
    });
  }
  
  obtenerDatosAsistencia() {
    this.validarService.guardarInfoAlumno(this.idSeccion).subscribe(
      (datos) => {
        this.datosAsistencia = datos;
        console.log('Datos de asistencia:', this.datosAsistencia);
        // Puedes hacer lo que quieras con los datos de asistencia, por ejemplo, mostrarlos en la interfaz.
      },
      (error) => {
        console.error('Error al obtener datos de asistencia:', error);
      }
    );
  }
}
