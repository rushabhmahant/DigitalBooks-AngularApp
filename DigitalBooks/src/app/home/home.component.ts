import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books!: Book[];
  // For displaying logo
  logoId!: number;
  base64Data: any;
  retrievedLogo: any;
  logoMap = new Map();

  constructor(private bookService: BookService, private appComponent: AppComponent) {
    console.log("Inside home component constructor");
   }

  ngOnInit(): void {

    this.appComponent.showHomeBtn(true);
    this.appComponent.showLoginBtn(true);
    this.appComponent.showSignupBtn(true);
    this.appComponent.showLogoutBtn(false);
    this.bookService.getAllBooks().subscribe(
      data => {console.log("All Books Fetched");
      this.books = data;
       this.books.forEach(book => {
        if(book.logo != null && book.logo != undefined){
          console.log("Getting logo for "); console.log(book.bookId);
          this.loadLogo(book.bookId, book.logo.logoId);
        }
        
       });
    },
      error => console.log("Error while fetching all books: " + error)
    );
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

}
