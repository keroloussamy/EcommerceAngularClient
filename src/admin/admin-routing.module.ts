import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddCtegoryComponent } from '../admin/Category/add-ctegory/add-ctegory.component';
import { CategoriesListComponent } from '../admin/Category/categories-list/categories-list.component';
import { EditCategoryComponent } from '../admin/Category/edit-category/edit-category.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { ProductsListComponent } from './Product/products-list/products-list.component';
import { OrdersListComponent } from './Order/orders-list/orders-list.component';
import { OrderDetailsComponent } from './Order/order-details/order-details.component';


const routes: Routes = [
  {path:"admin", children:[
    {path:"category/add", component:AddCtegoryComponent},
    {path:"categories", component:CategoriesListComponent},
    {path:"category/edit/:id", component:EditCategoryComponent},
    {path:"products", component:ProductsListComponent},
    {path:"product/add", component:AddProductComponent},
    {path:"product/edit/:id", component:EditProductComponent},
    {path: 'AddAdmin', component: RegisterAdminComponent},
    {path: "orders", component: OrdersListComponent},
    {path: "", component: OrdersListComponent},
    {path: "order/details/:id", component: OrderDetailsComponent}
  ]}
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AdminRoutingModule { }
