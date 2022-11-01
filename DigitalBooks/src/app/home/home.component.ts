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

  constructor(private bookService: BookService, private appComponent: AppComponent) {
    console.log("Inside home component constructor");
   }

  ngOnInit(): void {

    // this.appComponent.showHomeBtn(true);
    // this.appComponent.showLoginBtn(true);
    // this.appComponent.showSignupBtn(true);
    // this.appComponent.showLogoutBtn(false);

    this.bookService.getAllBooks().subscribe(
      data => {console.log("All Books Fetched");
      this.books = data;
    },
      error => console.log("Error while fetching all books: " + error)
    );
  }

}
