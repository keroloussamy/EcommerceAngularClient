import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCtegoryComponent } from './Category/add-ctegory/add-ctegory.component';
import { CategoriesListComponent } from './Category/categories-list/categories-list.component';
import { EditCategoryComponent } from './Category/edit-category/edit-category.component';



import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './auth/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCtegoryComponent,
    CategoriesListComponent,
    EditCategoryComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
