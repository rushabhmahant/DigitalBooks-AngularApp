import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book';
import { BookService } from '../book.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  searchForm!: FormGroup;
  books!: Book[];
  titleSearch!: string;
  categorySearch!: string;
  authorSearch!: string;
  priceSearch!: number;

  constructor(private formBuilder: FormBuilder,
    private bookService: BookService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void {

    console.log("Calling reader ngOnInit()");

    this.searchForm = this.formBuilder.group({
      title:[''],
      category:[''],
      author:[''],
      price:['', Validators.pattern(/^[0-9]\d*$/)],
    })

    this.bookService.getAllBooks().subscribe(
      data => this.books = data,
      error => console.log("Error while fetching books for reader: " + error)
    );

  }

  search(){
    this.bookService.searchBook(this.titleSearch, this.categorySearch, this.authorSearch, this.priceSearch).subscribe(
      data => {this.books = data;
        console.log("Books fetched: ");
        for(var book of this.books){
          console.log("Title: " + book.bookTitle+", Category: " + book.bookCategory + ", Price: " + book.bookPrice);
        }
      },
      error => console.log("Error while searching books: " + error)
    );

  }

  userSubscribedBooks(){
    //  Navigate to list of user subscribed books
  }

  userSubscriptions(){
    //  Navigate to list of user subscriptions
  }

  @HostListener('window:popstate', ['$event'])
onBrowserBackBtnClose(event: Event) {
    console.log('back button pressed');
    event.preventDefault(); 
    this.appComponent.goToHomePage();
}

}
