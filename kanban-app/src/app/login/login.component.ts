import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginForm: FormGroup;
  userEmail:FormControl

  constructor() {

  }

  ngOnInit(): void {
    this.userLoginForm = new FormGroup({
      userEmail: new FormControl('',Validators.required),
      password: new FormControl('', [Validators.required,Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  submitForm() {
    if (this.userLoginForm.valid) {
      console.log(this.userLoginForm.getRawValue());
    } else {
      console.log("Not Valid");
    }
  }

}
