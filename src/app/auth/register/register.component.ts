import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMessage: string = null;

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(6)]);

  //use this for html for passwords validation
  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  //validator
  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'email': new FormControl('', [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl('', [passwordMatch(this.passwordControl)])
    })
  });

  constructor(
    private formBuilder: FormBuilder,
    private userSevice: UserService,
    private router: Router
  ) { }

  // ngOnInit(): void {
  // }

  handleRegister(registerFormGroup: FormGroup) {

    if (registerFormGroup.invalid) {
      return;
    }
    const username = registerFormGroup.value.username;
    const email = registerFormGroup.value.email;
    const password = registerFormGroup.value.passwords.password;
    const rePassword = registerFormGroup.value.passwords.rePassword;

    this.userSevice.register(username, email, password, rePassword).subscribe(responseData => {
      console.log(responseData);
      this.router.navigate['/home'];//fix this
    },
    errorMessage => {
      console.log(errorMessage);
      this.errorMessage = errorMessage;
    });
    registerFormGroup.reset();

  }

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid
  }
}
