import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  public showPassword: boolean = false;
  loginForm!:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

  }

  login(){
    this.router.navigate(['reader']);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


}
