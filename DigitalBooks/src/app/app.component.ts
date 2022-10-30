import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigitalBooks';
  showLoginButton: boolean = true;
  showSignupButton: boolean = true;

  constructor(public matDialog: MatDialog, 
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.showLoginButton = true;
   }

  goToHomePage(){
    this.showLoginButton = true;
    this.showSignupButton = true;
    this.router.navigate(['home']);
  }

  openLoginDialog(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.matDialog.open(LoginDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.showLoginButton = result;
      this.showSignupButton = result;
    });
  
  }

  openSignupDialog(){

  }

}
