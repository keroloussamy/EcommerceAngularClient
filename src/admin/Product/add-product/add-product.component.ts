import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/Shared/icategory';
import { CategoryService } from 'src/_services/category.service';
import { ProductService } from 'src/_services/product.service';
import { IProduct } from 'src/Shared/IProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm = this.fb.group({
    name: ['',[Validators.required]],
    details: ['', [Validators.required]],
    price: [, [Validators.required, Validators.min(1)]],
    image: ['', [Validators.required]],
    quantity: [, [Validators.required, Validators.min(1)]],
    categoryId: [, [Validators.required]]
  });

  imageFile!: File; 

  categories:ICategory[] = [];

  isSubmitButtonClicked:boolean = false;

  constructor(private productService:ProductService, private categoryService:CategoryService, private fb:FormBuilder, private router: Router) {
    this.categoryService.getCategories().subscribe(
      data=>
      {
        this.categories = data;
      },
      error=>
      {
        console.log(error);
      }
    );
  }

  get name(){
    return this.productForm.get("name");
  }

  get details(){
    return this.productForm.get("details");
  }

  get price(){
    return this.productForm.get("price");
  }

  get image(){
    return this.productForm.get("image");
  }

  get quantity(){
    return this.productForm.get("quantity");
  }

  get categoryId(){
    return this.productForm.get("categoryId");
  }

  ngOnInit(): void {
  }

  submitButtonClicked(){
    this.isSubmitButtonClicked = true;
    if(!this.productForm.invalid)
    {
      this.uploadImage(this.imageFile);
    }
  }

  uploadImage(image:File)
  {
    console.log(image.name);
    const formDate = new FormData();
    formDate.append("file",image,image.name);
    this.productService.uploadProductImage(formDate).subscribe(
      data=>
      {
        this.SaveProduct(data);
      },
      error=>
      {
        console.log(error)
      }
    );
  }

  SaveProduct(data:any){
    var product:IProduct = {
      id : 0,
      name : this.name?.value,
      details : this.details?.value,
      price : this.price?.value,
      image : data.fileName,
      quantity : this.quantity?.value,
      categoryId : this.categoryId?.value
    }
    this.productService.addProduct(product).subscribe(
      data=>
      {
        this.router.navigateByUrl("/admin/products")
      },
      error=>
      {
        console.log(error)
      }
    );
  }

  onFileChange(event:any)
  {
    if(event.target.files.length > 0)
    {
      this.imageFile = event.target.files[0];
    }
  }

}
