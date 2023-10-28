// En tu pagina1.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidarService } from '../validar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {
  nombreUsuario: string = "";
  sedes: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private validarService: ValidarService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("PARAMS", params, this.validarService.nombreUsuario);
      this.nombreUsuario = this.validarService.nombreUsuario;

      this.validarService.getSedesInfo().subscribe(
        (sedes) => {
          this.sedes = sedes;
        },
        (error) => {
          console.error('Error al obtener información de sedes:', error);
        }
      );
    });
  }

  irARegistroAsistencia(sedeId: number) {
    const profesorId = 1; // Reemplaza con el ID real del profesor actual
    this.router.navigate(['/registro-asistencia'], {
      queryParams: { profesorId, sedeId },
    });
  }
}


