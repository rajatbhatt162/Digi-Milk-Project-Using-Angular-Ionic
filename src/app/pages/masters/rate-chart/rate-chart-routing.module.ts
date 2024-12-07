import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateChartPage } from './rate-chart.page';

const routes: Routes = [
  {
    path: '',
    component: RateChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateChartPageRoutingModule {}
