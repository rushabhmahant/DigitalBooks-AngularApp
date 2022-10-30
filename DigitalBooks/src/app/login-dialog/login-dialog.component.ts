import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    private router: Router, private dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

  }

  login(){
    // Log in user and verify credentials, also need to sent userId with navigation, once login is success 
    this.router.navigate(['author']);
    // This method is used to return data to app component, 
    //  but is not required here since we are redirecting to reader component
    // this.dialogRef.close(this.form.value);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  exit(){
    let showLoginButtons = true;
    this.dialogRef.close(showLoginButtons);
  }


}
