import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidarService } from '../validar.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  idSeccion: any;
  datosAsistencia: any;

  constructor(private route: ActivatedRoute, private validarService: ValidarService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idSeccion = params['idSeccion'];
      this.obtenerDatosAsistencia();
    });
  }

  obtenerDatosAsistencia() {
    this.validarService.obtenerDatosAsistencia(this.idSeccion).subscribe(
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
