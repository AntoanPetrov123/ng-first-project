import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDto, UserService } from 'src/app/core/user.service';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
  
  //use this for html for passwords validation
  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

   //validator
   registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl('', [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl('', [passwordMatch(this.passwordControl)])
    })
  });
  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  handleRegister(): void {

    const { username, email, passwords} = this.registerFormGroup.value;
    
    const body: CreateUserDto = {
      username: username,
      email: email,
      password: passwords.password
    }

    

    // this.userService.register(body).subscribe(() => {
    //   this.router.navigate(['/home']);
    // })
    
  }

}
