import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { ProductsListComponent } from './Product/products-list/products-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterAdminComponent } from './register-admin/register-admin.component';

import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';
import { OrdersListComponent } from './Order/orders-list/orders-list.component';
import { OrderDetailsComponent } from './Order/order-details/order-details.component';
import { AdminsListComponent } from './admins-list/admins-list.component';



@NgModule({
  declarations: [
    AddProductComponent,
    EditProductComponent,
    ProductsListComponent,
    RegisterAdminComponent,
    OrdersListComponent,
    OrderDetailsComponent,
    AdminsListComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [authInterceptorProviders],
})
export class AdminModule { }