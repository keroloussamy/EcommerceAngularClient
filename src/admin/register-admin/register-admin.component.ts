import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/_services/auth.service';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  form: any = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getUser());
    if (this.tokenStorage.getUser().roles.includes("Admin")) {

    } else {
      this.router.navigate(['']);
    }
  }

  onSubmit(): void {

    const { firstname, lastname, username, email, password } = this.form;

    this.authService.registerAdmin(firstname, lastname, username, email, password).subscribe(
      data => {
        this.router.navigateByUrl('/admin/adminList');
      },
      err => {
        console.log(err);
        this.errorMessage = err.error;
        this.isSignUpFailed = true;
      }
    );
  }

}
