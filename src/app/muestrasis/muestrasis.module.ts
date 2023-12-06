import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuestrasisPageRoutingModule } from './muestrasis-routing.module';

import { MuestrasisPage } from './muestrasis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuestrasisPageRoutingModule
  ],
  declarations: [MuestrasisPage]
})
export class MuestrasisPageModule {}
