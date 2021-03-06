import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';
import { TokenStorageService } from 'src/_services/token-storage.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { firstname, lastname, username, email, password } = this.form;

    this.authService.register(firstname, lastname, username, email, password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveUser(data);
        //this.roles = this.tokenStorage.getUser().roles;
        this.tokenStorage.saveToken(data.token);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        window.location.href = '/';
      },
      err => {
        console.log(err);
        this.errorMessage = err.error;
        this.isSignUpFailed = true;
      }
    );
  }
}
