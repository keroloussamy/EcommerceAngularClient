import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCtegoryComponent } from './Category/add-ctegory/add-ctegory.component';
import { CategoriesListComponent } from './Category/categories-list/categories-list.component';
import { EditCategoryComponent } from './Category/edit-category/edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCtegoryComponent,
    CategoriesListComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
