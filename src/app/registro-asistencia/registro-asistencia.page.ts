import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidarService } from '../validar.service';

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.page.html',
  styleUrls: ['./registro-asistencia.page.scss'],
})
export class RegistroAsistenciaPage implements OnInit {
  nombreUsuario: string = "";
  profesorId!: number; // Usamos el modificador '!' para indicar que estará definido en tiempo de ejecución
  sedeId!: number; // Usamos el modificador '!' para indicar que estará definido en tiempo de ejecución
  asignaturas: any[] = [];

  constructor(private route: ActivatedRoute, private validarService: ValidarService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.profesorId = params['profesorId'];
      this.sedeId = params['sedeId'];
      this.nombreUsuario = this.validarService.nombreUsuario;

      // Obtén las asignaturas del profesor en la sede seleccionada
      this.validarService.getAsignaturasDelProfesor(this.profesorId, this.sedeId).subscribe(
        (asignaturas) => {
          this.asignaturas = asignaturas;
          console.log('Asignaturas:', this.asignaturas);
        },
        (error) => {
          console.error('Error al obtener las asignaturas del profesor:', error);
        }
      );
    });
  }
}
