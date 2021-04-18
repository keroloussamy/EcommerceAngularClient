import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCtegoryComponent } from '../admin/Category/add-ctegory/add-ctegory.component';
import { CategoriesListComponent } from '../admin/Category/categories-list/categories-list.component';
import { EditCategoryComponent } from '../admin/Category/edit-category/edit-category.component';

import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path:"category/add", component:AddCtegoryComponent},
  {
    path: 'category/add',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
  {path:"categories", component:CategoriesListComponent},
  {path:"categories/edit/:id", component:EditCategoryComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
