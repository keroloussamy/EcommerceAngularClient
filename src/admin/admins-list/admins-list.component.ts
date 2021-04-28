import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/Shared/iuser';
import { TokenStorageService } from 'src/_services/token-storage.service';
import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit {

  admins:IUser[];

  constructor(private userService:UserService, private tokenStorage:TokenStorageService, private router: Router) {
    
    if (!this.tokenStorage.getUser().roles.includes("Admin")) {
      this.router.navigate(['']);
    }
    
    this.loadData();

   }

  ngOnInit(): void {
  }

  loadData()
  {
    this.userService.getAdmins().subscribe(
      data => {this.admins = data},
      error => {console.log(error)}
    );
  }

  deleteAdmin(id:string)
  {
    var user = this.tokenStorage.getUser();
    if(user.userId == id)
    {
      alert("You can't delete yourself");
    }
    else
    {
      this.userService.deleteUser(id).subscribe(
        data => {this.loadData();},
        error => {console.log(error)}
      );
    }
  }
}
