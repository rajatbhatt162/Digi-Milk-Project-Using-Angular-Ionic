import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietySalesPage } from './society-sales.page';

const routes: Routes = [
  {
    path: '',
    component: SocietySalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietySalesPageRoutingModule {}