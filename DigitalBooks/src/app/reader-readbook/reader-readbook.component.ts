import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { Book } from '../book';
import { BookService } from '../book.service';
import { UserService } from '../user.service';
//import { HostListener } from '@angular/core';

@Component({
  selector: 'app-reader-readbook',
  templateUrl: './reader-readbook.component.html',
  styleUrls: ['./reader-readbook.component.css']
})
export class ReaderReadbookComponent implements OnInit {

  bookId!: number;
  bookToRead = new Book();
  // For displaying logo
  logoId!: number;
  base64Data: any;
  retrievedLogo: any;
  logoMap = new Map();
  

  constructor(private userService: UserService, private bookService: BookService,
    private activatedRoute: ActivatedRoute, private appComponent: AppComponent) {
      console.log("Inside reader-readbook component constructor");
    this.appComponent.showHomeBtn(true);
    this.appComponent.showLoginBtn(false);
    this.appComponent.showSignupBtn(false);
    this.appComponent.showLogoutBtn(true);
     }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => { 
      console.log("params: " + params);
      this.bookId = Number(params.get("bookId")); 

      this.bookService.getBookById(this.bookId).subscribe(
        data => {
          this.bookToRead = data;
          if(this.bookToRead.logo != null && this.bookToRead.logo != undefined){
            console.log("Getting logo for "); console.log(this.bookToRead.bookId);
            this.loadLogo(this.bookToRead.bookId, this.bookToRead.logo.logoId);
          }
        },
        error => {
          console.log(error);
        }
      );

  });

  }

  loadLogo(bookId: number, logoId: number){
    this.bookService.getLogoById(logoId).subscribe(
      data => {
        console.log("Single Logo received");
        console.log(data);
        this.base64Data = data.logoBytes;
        this.retrievedLogo = 'data:image/png;base64,' + this.base64Data;
        this.logoMap.set(bookId, this.retrievedLogo);
      }
    );
  }

//   @HostListener('window:popstate', ['$event'])
// onBrowserBackBtnClose(event: Event) {
//     console.log('back button pressed');
//     event.preventDefault(); 
//     this.appComponent.goToHomePage();
// }

}
