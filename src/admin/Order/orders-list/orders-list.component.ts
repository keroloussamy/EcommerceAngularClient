import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/Shared/iorder';
import { IUser } from 'src/Shared/iuser';
import {IPaymentMethod} from 'src/Shared/ipayment-method'
import { OrderService } from 'src/_services/order.service';
import { UserService } from 'src/_services/user.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders:IOrder[];
  users:IUser[] = [];
  paymentMethods:IPaymentMethod[] = [];

  constructor(private orderService:OrderService, 
    private userService:UserService, 
    private router: Router,
    private tokenStorage:TokenStorageService) {

      if (!this.tokenStorage.getUser().roles.includes("Admin")) {
        this.router.navigate(['']);
      }

      this.setData();
   }

   setData()
   {
    this.orderService.getAllOrders().subscribe(
      data => {
        this.orders = data
        data.forEach(element => {

          this.userService.getUser(element.userId).subscribe(
            data => {this.users.push(data)},
            error => {console.log(error)}
          );

          this.orderService.getPaymentMethod(element.id).subscribe(
            data => {this.paymentMethods.push(data)},
            error => {console.log(error)}
          );

        });
      },
      error => {console.log(error)}
    );
   }

  ngOnInit(): void {
  }

  deleteOrder(id:number)
  {
    this.orderService.deleteOrder(id).subscribe(
      data => {this.setData();},
      error => {console.log(error)}
    );
  }

  orderDetails(id:number)
  {
    this.router.navigateByUrl("/admin/order/details/"+id);
  }

}
