import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuestrasisPage } from './muestrasis.page';

const routes: Routes = [
  {
    path: '',
    component: MuestrasisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuestrasisPageRoutingModule {}
