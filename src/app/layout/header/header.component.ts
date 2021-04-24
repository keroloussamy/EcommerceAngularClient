import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartProductsService } from 'src/_services/shopping-cart-products.service';
import { SubjectService } from 'src/_services/subject.service';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  itemsNumber: number = 0;
  userId: string = '';

  clickEventsubscription: Subscription;

  constructor(private tokenStorageService: TokenStorageService,
    private shoppingCartProductsService: ShoppingCartProductsService,
    private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.clickEventsubscription = this.subjectService.getClickEvent().subscribe(() => {
      this.calcItemsNum();
    })

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    const user = this.tokenStorageService.getUser();
    if (this.isLoggedIn) {
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('Admin');
      this.username = user.username;
      this.userId = user.userId;
    }
    this.calcItemsNum();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  //subject service
  calcItemsNum() {
    this.shoppingCartProductsService.getByShoppingCartId(this.userId).subscribe(num => {
      console.log(num);
      this.itemsNumber = num.length;
    }, err => console.log(err));
  }
}
