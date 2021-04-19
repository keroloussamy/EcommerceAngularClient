import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterAdminComponent } from './register-admin/register-admin.component';

import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';



@NgModule({
  declarations: [
    RegisterAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule


  ],
  providers: [authInterceptorProviders]
})
export class AdminModule { }
