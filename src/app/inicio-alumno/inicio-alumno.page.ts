import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ValidarService } from '../validar.service'; // Importa el servicio
import { Router } from '@angular/router';

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
  
      // Obtén las secciones del servicio
      this.seccionesAlumno = this.validarService.getSeccionesAlumno();
      console.log('Secciones del alumno:', this.seccionesAlumno);
    });
  }

}
