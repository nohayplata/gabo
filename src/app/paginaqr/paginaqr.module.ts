import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaqrPageRoutingModule } from './paginaqr-routing.module';

import { PaginaqrPage } from './paginaqr.page';
//npm install angularx-qrcode --save
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  imports: [ QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaqrPageRoutingModule
  ],
  declarations: [PaginaqrPage]
})
export class PaginaqrPageModule {}
