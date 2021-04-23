import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder } from 'src/Shared/iorder';
import { IPaypal } from 'src/Shared/ipaypal';
import { IVisa } from 'src/Shared/ivisa';
import { TokenStorageService } from './token-storage.service';

const url: string = environment.url_Api + "/api/Orders";
const url_visa: string = environment.url_Api + "/api/visas";
const url_paypal: string = environment.url_Api + "/api/payPals";
const url_OrderedProducts: string = environment.url_Api + "/api/OrderedProducts";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }


  getAllOrders(): Observable<IOrder[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,'Authorization': 'my-auth-token'
      })
    };

    return this.http.get<IOrder[]>(url, httpOptions)
  }


  addOrder(order: IOrder):Observable<number> {
    let userId = this.tokenStorageService.getUser().userId
    if (userId ==null)
    {
      alert("You must login first")
    }
    order.userId = userId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,'Authorization': 'my-auth-token'
      })
    };

    return this.http.post<number>(url, order,httpOptions)

  }

  deleteOrder(id: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,'Authorization': 'my-auth-token'
      })
    };

    return this.http.delete(`${url}/${id}`, httpOptions)

  }

  addVisa(visa: IVisa) {

    return this.http.post(url_visa, visa)

  }

  addPaypal(payPal: IPaypal) {

    return this.http.post(url_paypal, payPal)

  }

  addOrdersProductArray(orderdPrds: any[] ,orderId:number) {
    orderdPrds.forEach(prd => {
      this.addOrdersProduct(
        {quantity:prd.quantity,
          productId:prd.productId,
          orderId:orderId})
          .subscribe(d=>console.log("PRODUCT ADD SCCESS"))
    });

  }

  
  addOrdersProduct(orderdPrd: any) {
   
   return this.http.post(url_OrderedProducts, orderdPrd)

  }


}
