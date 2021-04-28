import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/Shared/iorder';
import { IOrderedProduct } from 'src/Shared/iordered-product';
import { IPaymentMethod } from 'src/Shared/ipayment-method';
import { IPaypal } from 'src/Shared/ipaypal';
import { IProduct } from 'src/Shared/IProduct';
import { IUser } from 'src/Shared/iuser';
import { IVisa } from 'src/Shared/ivisa';
import { OrderService } from 'src/_services/order.service';
import { ProductService } from 'src/_services/product.service';
import { TokenStorageService } from 'src/_services/token-storage.service';
import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order:IOrder
  id:number
  user:IUser
  paymentMethod:IPaymentMethod
  orderedProducts:IOrderedProduct[] = [];
  products:IProduct[] = [];
  paypal:IPaypal;
  visa:IVisa;

  constructor(private activatedroute: ActivatedRoute, 
    private orderService:OrderService, 
    private userService:UserService, 
    private productService:ProductService,
    private tokenStorage:TokenStorageService,
    private router: Router) {

      if (!this.tokenStorage.getUser().roles.includes("Admin")) {
        this.router.navigate(['']);
      }

      this.activatedroute.params.subscribe(data => {
        this.id = data.id;
      });

      this.orderService.getOrder(this.id).subscribe(
        data => {
          this.order = data;

          this.userService.getUser(this.order.userId).subscribe(
            data => {this.user = data},
            error => {console.log(error)}
          );

          this.orderService.getPaymentMethod(this.order.id).subscribe(
            data => {
              this.paymentMethod = data
              if(this.paymentMethod.method == "Paypal")
              {
                this.orderService.getPaypal(this.order.id).subscribe(
                  data => {this.paypal = <IPaypal>data}
                );
              }

              if(this.paymentMethod.method == "Visa")
              {
                this.orderService.getVisa(this.order.id).subscribe(
                  data => {this.visa = <IVisa>data}
                );
              }
            },
            error => {console.log(error)}
          );

          this.orderService.getOrderedProductsByOrder(this.order.id).subscribe(
            data => {
              this.orderedProducts = data;
              this.orderedProducts.forEach(element => {
                this.productService.getProductById(element.productId).subscribe(
                  data => {this.products.push(data)},
                  error => {console.log(error)}
                )
              });
            },
            error => {console.log(error)}
          );
        },
        error => {console.log(error)}
      );
   }

  ngOnInit(): void {
  }

}
