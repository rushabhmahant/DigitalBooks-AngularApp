import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigitalBooks';

  constructor(public matDialog: MatDialog) { }

  goToHomePage(){

  }

  openLoginDialog(){
    const dialogRef = this.matDialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  
  }

  openSignupDialog(){

  }

}
