import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from 'src/Shared/icategory';
import { IFavouriteProduct } from 'src/Shared/ifavourite-product';

@Injectable({
  providedIn: 'root'
})
export class FavouriteProductService {
  url: string = environment.url_Api + "/api/FavouriteProducts";

  constructor(private http: HttpClient) {


  }
  GetFavouriteProductByUserId(userId:string):Observable<IFavouriteProduct[]>
  {
    return this.http.get<IFavouriteProduct[]>(`${this.url}/user/${userId}`)

  }
  AddFavouriteProduct(favProduct:any) {
    return this.http.post(this.url, favProduct)

  }

  deleteFavouriteProduct(id: number) {


    return this.http.delete(`${this.url}/${id}`)

  }


}
