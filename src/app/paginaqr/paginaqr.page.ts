import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-paginaqr',
  templateUrl: './paginaqr.page.html',
  styleUrls: ['./paginaqr.page.scss'],
})
export class PaginaqrPage implements OnInit {
  texto: any;
  constructor() { }

  ngOnInit() {
  }

}
