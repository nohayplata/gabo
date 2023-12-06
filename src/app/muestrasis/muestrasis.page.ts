import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidarService } from '../validar.service';

@Component({
  selector: 'app-muestrasis',
  templateUrl: './muestrasis.page.html',
  styleUrls: ['./muestrasis.page.scss'],
})
export class MuestrasisPage implements OnInit {
  asistenciaAlumnos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private validarService: ValidarService
  ) {
    this.obtenerAsistencia()
  }

  ngOnInit() {
  }

  obtenerAsistencia() {
    //funcionará?
    const idAlumno = this.validarService.idAlumno;
    ///
    this.validarService.getAsistencia2(idAlumno).subscribe((asistencia: any[]) => {
      this.asistenciaAlumnos = asistencia;
      console.log(this.asistenciaAlumnos);
    });
  }

}
