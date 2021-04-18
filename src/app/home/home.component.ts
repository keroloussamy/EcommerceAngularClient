import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/_services/product.service';
import { IProduct } from 'src/app/Shared/IProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: IProduct[] = [];
  constructor(private productService:ProductService) { 
    this.productService.getAllProducts().subscribe(
      data =>
      {
        this.products = data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
  }

}
