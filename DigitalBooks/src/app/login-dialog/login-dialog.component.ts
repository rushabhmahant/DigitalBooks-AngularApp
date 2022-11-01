import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthRequest, AuthResponse, AuthService } from '../auth.service';
import { JwtUtilService } from '../jwt-util.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  public showPassword: boolean = false;
  loginForm!:FormGroup;
  
  userId!: number;  //  To store userId in session
  username!: string;
  password!: string;
  authRequest!: AuthRequest;
  authResponse!: AuthResponse;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, 
    private jwtUtilService: JwtUtilService, private matDialog: MatDialog,
    private router: Router, private dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

  }

  login(){
    // Log in user and verify credentials, also need to sent userId with navigation, once login is success 
    this.username = this.loginForm.get('username')?.value;
    this.password = this.loginForm.get('password')?.value;
    const route = "";
    this.authService.login(this.username, this.password).subscribe(
      data => {
        console.log("Logging in user: ")
        console.log(data);
        this.authResponse = data;
        const tokenInfo = (this.jwtUtilService.getDecodedAccessToken(this.authResponse.jwtToken));
        console.log(tokenInfo);
        const subject = tokenInfo.sub; 
        this.userId = subject.toString().split(",", 2)[0];
        sessionStorage.setItem('userId', this.userId.toString());
        this.jwtUtilService.setToken(this.authResponse.jwtToken);
        // Extract user-role
        const userRole = tokenInfo.roles;
        console.log(userRole);
        alert(userRole);
        //alert(userRole.toString().replace("[", "").replace("]","").toLowerCase());
        const routePath = userRole.toString().replace("[", "").replace("]","").replace("ROLE_","").toLowerCase();
        if(!routePath.includes(",")){
          this.router.navigate([routePath]);
        }
    },
      error => {console.log("Error while logging in: ");
      console.log(error);
      alert("Incorrect username or password, please try again.")
      this.matDialog.open(LoginDialogComponent);
    }
    );
    
    
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
