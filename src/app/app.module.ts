
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCtegoryComponent } from '../admin/Category/add-ctegory/add-ctegory.component';
import { CategoriesListComponent } from '../admin/Category/categories-list/categories-list.component';
import { EditCategoryComponent } from '../admin/Category/edit-category/edit-category.component';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SubjectService } from './../_services/subject.service';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AdminModule } from 'src/admin/admin.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FavouriteProductsComponent } from './components/favourite-products/favourite-products.component';
import { AdminHeaderComponent } from 'src/app/adminlayout/admin-header/admin-header.component';
import { AdminFooterComponent } from 'src/app/adminlayout/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from 'src/app/adminlayout/admin-sidebar/admin-sidebar.component';
import { from } from 'rxjs';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderComponent } from './components/order/order.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

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
    HomeComponent,
    ProfileComponent,
    ProductDetailsComponent,
    FavouriteProductsComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    ShoppingCartComponent,
    OrderComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [authInterceptorProviders, SubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
