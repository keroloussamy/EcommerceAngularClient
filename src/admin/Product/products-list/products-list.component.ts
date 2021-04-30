import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/Shared/icategory';
import { IProduct } from 'src/Shared/IProduct';
import { CategoryService } from 'src/_services/category.service';
import { ProductService } from 'src/_services/product.service';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: IProduct[] = [];
  categories: string[] = [];

  constructor(private productService: ProductService
    , private categoryService: CategoryService
    , private tokenStorageService: TokenStorageService
    , private router: Router) {
    if (!this.tokenStorageService.getUser().roles.includes("Admin")) {
      this.router.navigate(['']);
    }
    this.getProductsAndCategories();
  }

  ngOnInit(): void {
  }

  deletProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      data => this.getProductsAndCategories(),
      error => console.log(error)
    );
  }

  getProductsAndCategories() {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data

        this.products.forEach(product => {
          this.categoryService.getCategory(product.categoryId).subscribe(
            data => { this.categories.push(data.name) },
            error => console.log(error)
          );
        });
      },
      error => { console.log(error) }
    );
  }

}
