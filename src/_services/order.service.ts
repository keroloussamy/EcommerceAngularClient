import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder } from 'src/Shared/iorder';
import { IPaymentMethod } from 'src/Shared/ipayment-method';
import { IPaypal } from 'src/Shared/ipaypal';
import { IVisa } from 'src/Shared/ivisa';
import { ShoppingCartProductsService } from './shopping-cart-products.service';
import { SubjectService } from './subject.service';
import { TokenStorageService } from './token-storage.service';
import {catchError} from 'rxjs/operators';
import { IOrderedProduct } from 'src/Shared/iordered-product';

const url: string = environment.url_Api + "/api/Orders";
const url_visa: string = environment.url_Api + "/api/visas";
const url_paypal: string = environment.url_Api + "/api/payPals";
const url_OrderedProducts: string = environment.url_Api + "/api/OrderedProducts";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService
    , private shoppingCartProducts: ShoppingCartProductsService
    , private subjectService: SubjectService) { }


  getAllOrders(): Observable<IOrder[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,'Authorization': 'my-auth-token'
      })
    };

    return this.http.get<IOrder[]>(url, httpOptions)
  }

  getOrder(id:number): Observable<IOrder> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,'Authorization': 'my-auth-token'
      })
    };

    return this.http.get<IOrder>(url+"/"+id, httpOptions)
  }

  getOrderedProductsByOrder(id:number): Observable<IOrderedProduct[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,'Authorization': 'my-auth-token'
      })
    };

    return this.http.get<IOrderedProduct[]>(url_OrderedProducts+"/Order/"+id, httpOptions)
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

  getVisa(id:number) {

    return this.http.get(url_visa+"/"+id)

  }

  getPaypal(id:number) {

    return this.http.get(url_paypal+"/"+id)

  }

  getPaymentMethod(id:number):Observable<IPaymentMethod> {

    return this.http.get<IPaymentMethod>(environment.url_Api+"/api/PaymentMethods/"+id).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));

  }

  addOrdersProductArray(orderdPrds: any[] ,orderId:number) {
    let userId = this.tokenStorageService.getUser().userId;

    orderdPrds.forEach(prd => {
      this.addOrdersProduct(
        {quantity:prd.quantity,
          productId:prd.productId,
          orderId:orderId})
          .subscribe(d=>
            {
              this.shoppingCartProducts.delete(prd.productId ,userId).subscribe(
                a=>this.subjectService.sendClickEvent()
              )

            })
    });


  }

  
  addOrdersProduct(orderdPrd: any) {
   
   return this.http.post(url_OrderedProducts, orderdPrd)

  }


}
