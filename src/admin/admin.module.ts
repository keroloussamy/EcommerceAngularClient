import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { ProductsListComponent } from './Product/products-list/products-list.component';



@NgModule({
  declarations: [
    AddProductComponent,
    EditProductComponent,
    ProductsListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
