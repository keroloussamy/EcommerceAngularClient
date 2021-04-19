import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/Shared/IProduct';
import { ProductService } from 'src/_services/product.service';
import { Location } from '@angular/common';
import { IFavouriteProduct } from 'src/Shared/ifavourite-product';
import { FavouriteProductService } from 'src/_services/favourite-product.service';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  prdId!: number;
  prd!: IProduct;
  isAdded=false;

  constructor(private prdService: ProductService
    , private router: Router
    , private activatedroute: ActivatedRoute
    , private location: Location
    , private FavProductService: FavouriteProductService
    , private tokenStorageService: TokenStorageService) {
    this.activatedroute.params.subscribe(data => {
      this.prdId = data.id;
      this.prdService.getProductById(this.prdId).subscribe(
        data => this.prd = data,
        err => console.log(err)
      )
    }

    )
  }

  ngOnInit(): void {

  }

  AddToFavourite() {
    let userId = this.tokenStorageService.getUser().userId
    if (userId == null) {
      alert("you must login first")
    }
    let favProuduct =
      { productId: this.prdId, userId: userId };
    this.FavProductService.AddFavouriteProduct(favProuduct)
      .subscribe(
        arg =>{console.log (arg)
        this.isAdded =true}
        ,err =>console.log (err));
    
  }

  goBack() {
    this.location.back();
  }

}
