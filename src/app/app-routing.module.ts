import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCtegoryComponent } from '../admin/Category/add-ctegory/add-ctegory.component';
import { CategoriesListComponent } from '../admin/Category/categories-list/categories-list.component';
import { EditCategoryComponent } from '../admin/Category/edit-category/edit-category.component';

import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { FavouriteProductsComponent } from './components/favourite-products/favourite-products.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'FavouriteProducts', component: FavouriteProductsComponent },
  { path: 'order', component: OrderComponent },  
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
