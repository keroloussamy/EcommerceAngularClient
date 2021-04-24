import { IShoppingCartProducts } from './../Shared/ishopping-cart-products';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartProductsService {


  constructor(private http: HttpClient) { }

  private readonly ApiUrl = 'https://localhost:44330/api/ShoppingCartProducts';

  getAll(){
    return this.http.get<IShoppingCartProducts[]>(this.ApiUrl);
  }

  getByShoppingCartId(id: string){
    return this.http.get<IShoppingCartProducts[]>(`${this.ApiUrl}/${id}`);
  }

  GetItemsCount(id: string){
    return this.http.get<number>(`${this.ApiUrl}/items/${id}`);
  }
  post(formData: IShoppingCartProducts) {
    return this.http.post(this.ApiUrl, formData);
  }

  put(formData: IShoppingCartProducts) {
    return this.http.put(`${this.ApiUrl}/${formData.id}`, formData);
  }

  delete(proId:number, userId:string){


const params = new HttpParams()
  .set('prodcutId', proId.toString())
  .set('userId', userId);
    return this.http.delete(`${this.ApiUrl}`, {params});
  }
}
