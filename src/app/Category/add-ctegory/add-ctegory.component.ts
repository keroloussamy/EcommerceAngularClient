import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/Shared/icategory';

@Component({
  selector: 'app-add-ctegory',
  templateUrl: './add-ctegory.component.html',
  styleUrls: ['./add-ctegory.component.css']
})
export class AddCtegoryComponent implements OnInit {
  createCategoryForm: FormGroup = new FormGroup ({
      name: new FormControl('', [Validators.required])
    });

  constructor(private catService: CategoryService, private router: Router
    ) { }

  ngOnInit(): void {
  }


  createCategory() {

    this.catService.addCategory(this.createCategoryForm.value)
      .subscribe(
        data =>{ console.log(data);
          this.router.navigateByUrl("/categories")
        },
        err => console.log(err)
      )
  }
  goBack(){
    this.router.navigateByUrl("/categories")
  }

}
