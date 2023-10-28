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

  constructor(private route: ActivatedRoute, private router: Router, private validarService: ValidarService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("PARAMS", params,this.validarService.nombreUsuario);
      this.nombreUsuario = this.validarService.nombreUsuario; // Obtén el nombre del servicio
    });
  }

}
