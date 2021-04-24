import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from 'src/Shared/IProduct';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

const Url = "https://localhost:44330/api/Products";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(Url, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  addProduct(product:IProduct): Observable<any>{
    return this.http.post(Url,product, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  getProductsPage(pageNum:number, limit?:number): Observable<IProduct[]>{
    if(limit != null)
    {
      var pageUrl = Url+"/api/Products/page?pageNum="+pageNum+"&limit="+limit;
    }
    else{
      var pageUrl = Url+"/api/Products/page?pageNum="+pageNum;
    }
    return this.http.get<IProduct[]>(pageUrl, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  searchProduct(keyword:string): Observable<any>{
    return this.http.get<IProduct[]>(Url+"/api/Products/Search/"+keyword, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  getProductById(id:number): Observable<IProduct>{
    return this.http.get<IProduct>(Url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  updateProduct(id:number, product:IProduct): Observable<any>{
    return this.http.put(Url+"/"+id, product, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  deleteProduct(id:number): Observable<any>{
    return this.http.delete(Url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  uploadProductImage(formData:FormData): Observable<any>{
    return this.http.post(Url+"/uploadImage", formData).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  getProductByCategoryId(id:number): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(Url+"/Category/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}
