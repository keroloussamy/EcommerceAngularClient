import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/Shared/iorder';
import { IPaymentMethod } from 'src/Shared/ipayment-method';
import { IPaypal } from 'src/Shared/ipaypal';
import { IVisa } from 'src/Shared/ivisa';
import { OrderService } from 'src/_services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService) { }
  paymentMethod: IPaymentMethod = { id: 1, method: "" }
  visa: IVisa = { id: 0, expire: "", number: "", sequreCode:"" };
  paypal: IPaypal = { id: 1, account: "" }
  order: IOrder = { id: 0, totalPrice: 100, userId: "", paymentMethod: this.paymentMethod }
  ngOnInit(): void {
  }


  paypalPay() {

    this.paymentMethod.method = "Paypal"

    this.orderService.addOrder(this.order).subscribe(
      data => {
        this.paypal.id = data;
        this.orderService.addPaypal(this.paypal).subscribe(
          data => console.log(data),
          err => console.log(err)
        )
      },
      err => console.log(err)
    )


  }

  visalPay() {
    this.paymentMethod.method = "Visa"

    this.orderService.addOrder(this.order).subscribe(
      data => {
        this.visa.id = data;
        this.orderService.addVisa(this.visa).subscribe(
          data => console.log(data),
          err => console.log(err)
        )
      },
      err => console.log(err)
    )

  }

  onDeliveryPay() {

    this.paymentMethod.method = "on Delivery Payment"

    
    this.orderService.addOrder(this.order).subscribe(
      data => console.log(data),
          err => console.log(err)
        )
      

  }
}
