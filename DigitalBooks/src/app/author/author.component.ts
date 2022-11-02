import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Book } from '../book';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  books!: Book[];
  userId!: number;

  constructor(private userService: UserService, private bookService: BookService,
    private appComponent: AppComponent) {
    console.log("Inside author component constructor");
    this.appComponent.showHomeBtn(true);
    this.appComponent.showLoginBtn(false);
    this.appComponent.showSignupBtn(false);
    this.appComponent.showLogoutBtn(true);
   }

  ngOnInit(): void {

    this.getAllAvailableBooks();

  }

  updateBook(book: Book){

  }

  blockBook(book: Book){
    if(confirm("Are you sure?")){
    this.userService.setBookBlockedStatus(Number(sessionStorage.getItem('userId')), book.bookId, "yes", book).subscribe(
      data => {
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
      data => this.books = data,
      error => console.log("Error while fetching books for reader: " + error)
    );
  }

}
