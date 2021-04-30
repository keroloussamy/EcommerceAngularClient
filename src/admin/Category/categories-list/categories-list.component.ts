import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/_services/category.service';
import { ICategory } from 'src/Shared/icategory';
import { TokenStorageService } from 'src/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  catList: Array<ICategory> = [];
  constructor(private catService: CategoryService, private tokenStorageService: TokenStorageService
    , private router: Router) {
    if (!this.tokenStorageService.getUser().roles.includes("Admin")) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.catService.getCategories().subscribe(
      data => this.catList = data,
      err => console.log(err)
    )

  }

  deletCategory(id: number) {

    this.catService.deleteCategory(id)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      )
    this.catList = this.catList.filter(c => c.id != id);
  }

}
