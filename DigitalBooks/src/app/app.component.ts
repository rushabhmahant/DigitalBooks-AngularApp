import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtUtilService } from './jwt-util.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigitalBooks';
  showHomeButton!: boolean;
  showLoginButton!: boolean;
  showSignupButton!: boolean;
  showLogoutButton!: boolean;

  currentUser: User = new User();

  constructor(public matDialog: MatDialog, 
    private router: Router, private activatedRoute: ActivatedRoute, private jwtUtilService: JwtUtilService) {
    console.log("Inside app component constructor");
    this.showLoginButton = true;
    this.showSignupButton = true;
    this.showLogoutButton = false;
   }

   ngOnInit() {
    
  }

  goToHomePage(){
    this.showLoginButton = true;
    this.showSignupButton = true;
    this.showLogoutButton = false;
    this.logout()
    this.router.navigate(['home']);
  }

  openLoginDialog(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.matDialog.open(LoginDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.showLoginButton = result;
      // this.showSignupButton = result;
    });
  
  }

  openSignupDialog(){

  }

  setCurrentUser(user: User){
    this.currentUser = user;
  }

  getCurrentUser(): User{
    return this.currentUser;
  }

  logout(){
    this.jwtUtilService.logout();
    this.showLoginButton = true;
    this.showSignupButton = true;
    this.showLogoutButton = false;
    this.router.navigate(['home']);
  }

  //  Below methods to handle navigation buttons dusplay
  showHomeBtn(show: boolean){
    this.showHomeButton = show;
  }

  showLoginBtn(show: boolean){
    this.showLoginButton = show;
  }

  showSignupBtn(show: boolean){
    this.showSignupButton = show;
  }

  showLogoutBtn(show: boolean){
    this.showLogoutButton = show;
  }

}
