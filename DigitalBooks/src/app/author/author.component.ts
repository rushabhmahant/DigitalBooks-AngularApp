import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  books!: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {

    this.bookService.getAllBooks().subscribe(
      data => this.books = data,
      error => console.log("Error while fetching books for reader: " + error)
    );

  }

  updateBook(book: Book){

  }

  blockBook(book: Book){

  }

  unblockBook(book: Book){

  }

}
