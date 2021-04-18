import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/_services/product.service';
import { IProduct } from 'src/Shared/IProduct';
import { ICategory } from 'src/Shared/icategory';
import { CategoryService } from 'src/_services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: IProduct[] = [];
  categories: ICategory[] = [];
  
  constructor(private productService:ProductService, private categoryServices:CategoryService) { 
    this.productService.getAllProducts().subscribe(
      data =>
      {
        this.products = data;
      },
      err=>{
        console.log(err);
      }
    );

    this.categoryServices.getCategories().subscribe(
      data =>
      {
        this.categories = data;
      },
      err => 
      {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
  }

}
