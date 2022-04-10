import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { emailValidator } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = null;
  //validator
  loginFormGroup: FormGroup = this.formBuilder.group({ //validation
    'email': new FormControl('', [Validators.required, emailValidator]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(
    //formBuilder is for validation
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  loginHandler(): void {
    console.log('form is submitted');
  }
  
  handleLogin(loginFormGroup: FormGroup): void {

    if (loginFormGroup.invalid) {
      return;
    }

    const email = loginFormGroup.value.email;
    const password = loginFormGroup.value.password;

    this.userService.login(email, password).subscribe(responseData => {
      console.log(responseData);
    },
    errorMessage => {
      console.log(errorMessage);
      this.errorMessage = errorMessage;
    });
    loginFormGroup.reset();

  }

}
