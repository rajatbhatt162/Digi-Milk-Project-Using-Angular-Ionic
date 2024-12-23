import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { AddDairyProductsModalComponent } from '../../components/add-dairy-products-modal/add-dairy-products-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductsPageRoutingModule
  ],
  declarations: [ProductsPage,AddDairyProductsModalComponent]
})
export class ProductsPageModule {}
