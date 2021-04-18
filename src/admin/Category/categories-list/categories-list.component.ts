import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/_services/category.service';
import { ICategory } from 'src/Shared/icategory';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  catList: Array<ICategory> = [];
  constructor(private catService: CategoryService) {

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
      this.catList= this.catList.filter(c=>c.id!=id);
  }

}
