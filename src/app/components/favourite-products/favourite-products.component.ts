import { Component, OnInit } from '@angular/core';
import { IFavouriteProduct } from 'src/Shared/ifavourite-product';
import { FavouriteProductService } from 'src/_services/favourite-product.service';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Component({
  selector: 'app-favourite-products',
  templateUrl: './favourite-products.component.html',
  styleUrls: ['./favourite-products.component.css']
})
export class FavouriteProductsComponent implements OnInit {

  favProducts: IFavouriteProduct[] = [];

  constructor(private favProductService: FavouriteProductService
    , private tokenStorageService: TokenStorageService) {

    let userId = this.tokenStorageService.getUser().userId

    this.favProductService.GetFavouriteProductByUserId(userId).subscribe(
      data => { this.favProducts = data; },
      err => console.log(err)
    )
  }

  ngOnInit(): void {
  }

  removeFromfavproducts(id: number) {
    this.favProductService.deleteFavouriteProduct(id).subscribe(
      ()=>this.favProducts = this.favProducts.filter(f=>f.id != id),
      err=>console.log(err)
    )

  }

  addToCart() {
  }
}
