import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User();   // User signing up
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  signupForm!:FormGroup;
  // form values
  firstname!: string;
  lastname!: string;
  username!: string;
  password!: string;
  confirmpassword!: string;
  role!: string;

  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog,
    private userService: UserService,
    private router: Router, private dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    console.log("SignupComponent Initialized");console.log(this.firstname);
    this.signupForm = this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
      role:['',Validators.required]
    })

  }

  signup(){

    this.firstname = this.signupForm.get('firstname')?.value;
    this.lastname = this.signupForm.get('lastname')?.value;
    this.username = this.signupForm.get('username')?.value;
    this.password = this.signupForm.get('password')?.value;
    this.confirmpassword = this.signupForm.get('confirmpassword')?.value;
    this.role = this.signupForm.get('role')?.value;

    console.log(this.firstname+this.lastname+this.username+
      this.password+this.confirmpassword+this.role);

    if(this.firstname == undefined || this.lastname == undefined || this.username == undefined || 
      this.password == undefined || this.confirmpassword == undefined || this.role == undefined
      || this.firstname == "" || this.lastname == "" || this.username == "" || 
      this.password == "" || this.confirmpassword == "" || this.role == ""){
        alert("Please provide all the details");
        //this.router.navigate(['signup']);
        // or
        // this.matDialog.open(SignupComponent, {
        //   data: {
        //     dataKey: this.firstname
        //   }
        // });
        this.matDialog.open(SignupComponent);
    }
    else{
      if(this.password == this.confirmpassword){
      
        console.log("Valid details.")
        const roleId: number = (this.role == "reader") ? 102 : 101;
        this.user.userFirstName = this.firstname;
        this.user.userLastName = this.lastname;
        this.user.username = this.username;
        this.user.userPassword = this.password;
        console.log(this.username + ", " + this.password + ", " + this.role + ", roleId" + roleId);
        this.userService.signup(this.user, roleId).subscribe(
          data => {
            console.log("Signing up user: ")
            console.log(data);
            this.user = data;
            
            // Extract user-role
            const userRole = data.userRoles;
            console.log(userRole);
            //alert("User "+this.firstname +" signed up as " + userRole);
            alert("User "+this.firstname +" signed up as " + userRole.toString().replace("[", "").replace("]","").replace("ROLE_","").toLowerCase());
            //this.router.navigate(['home']);
    },
      error => {console.log("Error while signing in: ");
      console.log(error);
      alert("Error occurred while signing up, please try again later.");
      //this.matDialog.open(SignupComponent);
    }
    );
    }
    else{
      alert("Passwords do not match !");
      //this.router.navigate(['signup']);
      // or
      this.matDialog.open(SignupComponent);
    }
  }
    
    // This method is used to return data to app component, 
    //  but is not required here since we are redirecting to reader component
    // this.dialogRef.close(this.form.value);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  exit(){
    let showLoginButtons = true;
    this.dialogRef.close(showLoginButtons);
  }

}
