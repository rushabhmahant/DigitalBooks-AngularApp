import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Book } from '../book';
import { BookService } from '../book.service';
import { UserService } from '../user.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  books!: Book[];
  userId: number = Number(sessionStorage.getItem('userId'));
  // For displaying logo
  logoId!: number;
  base64Data: any;
  retrievedLogo: any;
  logoMap = new Map();

  constructor(private userService: UserService, private bookService: BookService,
    private appComponent: AppComponent, private router: Router) {
    console.log("Inside author component constructor");
    this.appComponent.showHomeBtn(true);
    this.appComponent.showLoginBtn(false);
    this.appComponent.showSignupBtn(false);
    this.appComponent.showLogoutBtn(true);
   }

  ngOnInit(): void {

    this.getAllAvailableBooks();

  }

  addBook(){
    this.router.navigate(['author-addbook']);
  }

  updateBook(book: Book){
    const bookId: number = book.bookId;
    this.router.navigate(['author-updatebook', bookId]);
  }

  blockBook(book: Book){
    if(confirm("Are you sure?")){
    this.userService.setBookBlockedStatus(this.userId, book.bookId, "yes", book).subscribe(
      data => {
      alert("Book blocked successfully !")
      this.getAllAvailableBooks();
    },
      error => {alert("Error while blocking book");
      console.log(error);}
    );
  }
  }

  unblockBook(book: Book){
    this.userService.setBookBlockedStatus(Number(sessionStorage.getItem('userId')), book.bookId, "no", book).subscribe(
      data => {alert("Book unblocked successfully !");this.getAllAvailableBooks()},
      error => {alert("Error while unblocking book");
      console.log(error);}
    );
  }

  getAllAvailableBooks(){
    this.bookService.getAllBooks().subscribe(
      data => {this.books = data;
        this.books.forEach(book => {
          if(book.logo != null && book.logo != undefined){
            console.log("Getting logo for "); console.log(book.bookId);
            this.loadLogo(book.bookId, book.logo.logoId);
          }
          
         });
      },
      error => console.log("Error while fetching books for reader: " + error)
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

  deleteBook(book: Book){
    // For book having logo,  Delete the logo first (maybe in mS)
    if(confirm("Are you sure you want to delete book " + book.bookTitle + " ?")){
    this.bookService.deleteBook(this.userId, book).subscribe(
      data => {
        alert("Book " + book.bookTitle + " deleted successfully");
        this.getAllAvailableBooks();
      },
      error => {
        console.log(error);
        alert("Error while creating book, please try again later.")
      }
    );
  }
}

@HostListener('window:popstate', ['$event'])
onBrowserBackBtnClose(event: Event) {
    console.log('back button pressed');
    event.preventDefault(); 
    this.appComponent.goToHomePage();
}

}
