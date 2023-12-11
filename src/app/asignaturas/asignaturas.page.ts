import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidarService } from '../validar.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  asignaturas: any[] = [];
  secciones: any[] = [];
  secciones$: any;

  constructor(private route: ActivatedRoute, private validarService: ValidarService, private router: Router) {}

  ngOnInit() {
    this.asignaturas = this.validarService.getAsignaturasProfesor();
    console.log("ON INIT",this.asignaturas);
    
      this.secciones$ = this.asignaturas // Convertir el array de secciones en un observable
  }

  mostrarSecciones(idAsignatura: number): void {
    this.validarService.getSeccionesDeAsignatura(idAsignatura)
      .subscribe((secciones: any[]) => {
        this.secciones = secciones;
      });
  }
  
  generarQR(idSeccion: number) {
    // Lógica para navegar a la página de generación QR y pasar el ID de la sección
    this.router.navigate(['/paginaqr'], { queryParams: { idSeccion } });
  }
}
