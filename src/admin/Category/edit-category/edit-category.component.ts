import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/app/Shared/icategory';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  catId!: number;
  cat: ICategory = { id: 1, name: '' };

  editCategoryForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private catService: CategoryService
    , private router: Router
    , private activatedroute: ActivatedRoute) {

    this.activatedroute.params.subscribe(data => {
      this.catId = data.id;
    })
  }

  ngOnInit(): void {
    this.catService.getCategory(this.catId).subscribe(
      data => this.cat = data,
      err => console.log(err)
    )
  }


  editCategory() {
    this.cat.name = this.editCategoryForm.value.name;
    this.catService.updateCategory(this.catId, this.cat)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl("/categories")
        },
        err => console.log(err)
      )

    this.router.navigateByUrl("/categories")

  }

  goBack() {
    this.router.navigateByUrl("/categories")
  }
}
