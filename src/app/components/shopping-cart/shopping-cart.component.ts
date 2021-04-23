import { IShoppingCartProducts } from './../../../Shared/ishopping-cart-products';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartProductsService } from 'src/_services/shopping-cart-products.service';
import { TokenStorageService } from 'src/_services/token-storage.service';
import { SubjectService } from 'src/_services/subject.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: IShoppingCartProducts[] = [];
  total: number = 0;
  constructor(private shoppingCartProducts: ShoppingCartProductsService,
    private tokenStorageService: TokenStorageService,
    private subjectService: SubjectService) {

  }

  ngOnInit(): void {
    console.log(this.tokenStorageService.getUser().userId);
    this.getData();
  }

  getData() {
    this.shoppingCartProducts.getByShoppingCartId(this.tokenStorageService.getUser().userId).subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  getTotal() {
    var total = 0;
    for (var i = 0; i < this.products.length; i++) {
      var product = this.products[i];
      total += ((product.productPrice ? product.productPrice : 0) * product.quantity);
    }
    return total;
  }

  delete(proid: number) {

    this.shoppingCartProducts.delete(proid, this.tokenStorageService.getUser().userId).subscribe(
      data => {
        this.getData();
        console.log(data);
        this.subjectService.sendClickEvent();
      },
      err => {
        console.log(err);
      }
    );
  }

}
