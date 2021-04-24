import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/Shared/iorder';
import { IPaymentMethod } from 'src/Shared/ipayment-method';
import { IPaypal } from 'src/Shared/ipaypal';
import { IShoppingCartProducts } from 'src/Shared/ishopping-cart-products';
import { IVisa } from 'src/Shared/ivisa';
import { OrderService } from 'src/_services/order.service';
import { ShoppingCartProductsService } from 'src/_services/shopping-cart-products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService
    , private route: ActivatedRoute
    , private shoppingCartProducts: ShoppingCartProductsService
    , private router: Router
    ) {

  }

  paymentMethod: IPaymentMethod = { id: 1, method: "" }
  visa: IVisa = { id: 0, expire: "", number: "", sequreCode: "" };
  paypal: IPaypal = { id: 1, account: "" }
  order: IOrder = { id: 0, totalPrice: 100, userId: "", paymentMethod: this.paymentMethod }
  products: IShoppingCartProducts[] = [];



  ngOnInit(): void {

    this.order.totalPrice = this.route.snapshot.params["total"];
  }


  paypalPay() {

    this.paymentMethod.method = "Paypal"

    this.orderService.addOrder(this.order).subscribe(
      orderId => {
        this.paypal.id = orderId;
        this.orderService.addPaypal(this.paypal).subscribe(
          data => console.log(data),
          err => console.log(err)
        )
        this.afterOrder(orderId)

      },
      err => console.log(err)
    )


  }

  visalPay() {
    this.paymentMethod.method = "Visa"

    this.orderService.addOrder(this.order).subscribe(
      orderId => {
        this.visa.id = orderId;
        this.orderService.addVisa(this.visa).subscribe(
          data => console.log(data),
          err => console.log(err)
        )
        this.afterOrder(orderId)

      },
      err => console.log(err)
    )

  }

  onDeliveryPay() {

    this.paymentMethod.method = "on Delivery Payment"


    this.orderService.addOrder(this.order).subscribe(
      orderId => this.afterOrder(orderId)
      ,
      err => console.log(err)
    )

  }

  afterOrder(orderId: number) {
    this.shoppingCartProducts.getByShoppingCartId(this.order.userId).subscribe(
      data => {
        this.orderService.addOrdersProductArray(data, orderId)
        this.router.navigateByUrl("/home")
      },
      err => {
        console.log(err);
      }
    );
  }
}
