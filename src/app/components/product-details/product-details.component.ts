import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/Shared/IProduct';
import { ProductService } from 'src/_services/product.service';
import { Location } from '@angular/common';
import { IFavouriteProduct } from 'src/Shared/ifavourite-product';
import { FavouriteProductService } from 'src/_services/favourite-product.service';
import { TokenStorageService } from 'src/_services/token-storage.service';
import { ShoppingCartProductsService } from 'src/_services/shopping-cart-products.service';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { SubjectService } from 'src/_services/subject.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements AfterViewInit {

  prdId!: number;
  prd!: IProduct;
  isAdded = false;
  @ViewChild(HeaderComponent)
  private headerComponent: HeaderComponent;
  constructor(private prdService: ProductService
    , private router: Router
    , private activatedroute: ActivatedRoute
    , private location: Location
    , private FavProductService: FavouriteProductService
    , private tokenStorageService: TokenStorageService
    , private shoppingCartProductsService: ShoppingCartProductsService
    , private subjectService: SubjectService
  ) {

    this.activatedroute.params.subscribe(data => {
      this.prdId = data.id;
      this.prdService.getProductById(this.prdId).subscribe(
        data => this.prd = data,
        err => console.log(err)
      )
    })


  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


  AddToFavourite() {
    let userId = this.tokenStorageService.getUser().userId
    if (userId == null) {
      alert("you must login first")
    } else {
      let favProuduct =
        { productId: this.prdId, userId: userId };
      this.FavProductService.AddFavouriteProduct(favProuduct)
        .subscribe(
          arg => {
            console.log(arg)
            this.isAdded = true
          }
          , err => console.log(err));
    }
  }

  goBack() {
    this.location.back();
  }

  addToCart() {
    let userId = this.tokenStorageService.getUser().userId;
    if (userId == null) {
      alert("You have to login first.");
    } else {

      this.shoppingCartProductsService.post({ id: 0, quantity: 1, productId: this.prd.id, userId: userId }).subscribe(
        arg => {
          console.log(arg);
          //this.subjectService.onButtonClick();
          this.subjectService.sendClickEvent();
        },
        err => {
          console.log(err);
        }
      )
    }

  }

}
