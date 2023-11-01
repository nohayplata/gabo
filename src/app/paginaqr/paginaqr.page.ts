import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ActivatedRoute, Router, } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-paginaqr',
  templateUrl: './paginaqr.page.html',
  styleUrls: ['./paginaqr.page.scss'],
})
export class PaginaqrPage implements OnInit {
  texto: any;
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.texto = params['idSeccion']; // Utiliza ['idSeccion'] en lugar de .idSeccion
    });
  }

}
