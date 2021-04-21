import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/Shared/icategory';
import { IProduct } from 'src/Shared/IProduct';
import { CategoryService } from 'src/_services/category.service';
import { ProductService } from 'src/_services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId:number = 0;

  product:IProduct = {
    id : 0,
    name : '',
    details: '',
    image: '',
    price : 0,
    quantity: 0,
    categoryId : 0
  }

  productForm = this.fb.group({
    name: ['' ,[Validators.required]],
    details: ['' , [Validators.required]],
    price: [ , [Validators.required, Validators.min(1)]],
    image: [''],
    quantity: [ , [Validators.required, Validators.min(1)]],
    categoryId: [ , [Validators.required]]
  });

  imageFile!: File; 

  categories:ICategory[] = [];

  isSubmitButtonClicked:boolean = false;

  constructor(private productService:ProductService
    , private categoryService: CategoryService
    , private router: Router
    , private activatedroute: ActivatedRoute
    , private fb:FormBuilder) 
  {

      this.activatedroute.params.subscribe(data => {
        this.productId = data.id;
      });

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

      this.productService.getProductById(this.productId).subscribe(
        data => {
          this.product = data;
          console.log(this.product);
          this.assignFormControlsToProductData();
        },
        error => console.log(error)
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

  assignFormControlsToProductData()
  {
    this.productForm.get("name")?.setValue(this.product.name);
    this.productForm.get("details")?.setValue(this.product.details);
    this.productForm.get("price")?.setValue(this.product.price);
    this.productForm.get("quantity")?.setValue(this.product.quantity);
    this.productForm.get("categoryId")?.setValue(this.product.categoryId);
  }

  submitButtonClicked(){
    this.isSubmitButtonClicked = true;
    if(!this.productForm.invalid)
    {
      if(this.imageFile == undefined)
        this.SaveProduct({fileName:this.product.image});
      else
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
      id : this.product.id,
      name : this.name?.value,
      details : this.details?.value,
      price : this.price?.value,
      image : data.fileName,
      quantity : this.quantity?.value,
      categoryId : this.categoryId?.value
    }
    this.productService.updateProduct(this.product.id, product).subscribe(
      data=>
      {
        this.router.navigateByUrl("/productslist")
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
