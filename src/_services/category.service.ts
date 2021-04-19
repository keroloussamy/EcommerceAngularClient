import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../Shared/icategory';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.get<ICategory[]>(environment.url_Api+"/api/Categories",httpOptions)
  }
  
  getCategory(id : number): Observable<ICategory> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.get<ICategory>(environment.url_Api+"/api/Categories/"+id,httpOptions)
  }


  addCategory(cat: ICategory) {
    

    return this.http.post(environment.url_Api+"/api/Categories", cat)

  }

  updateCategory(id:number, cat: ICategory) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.put(environment.url_Api+"/api/Categories/"+id, cat, httpOptions)

  }

  deleteCategory(id:number) {
   

    return this.http.delete(environment.url_Api+"/api/Categories/"+id)

  }
 
  

}
