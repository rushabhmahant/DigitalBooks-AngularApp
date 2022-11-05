import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-author-updatebook',
  templateUrl: './author-updatebook.component.html',
  styleUrls: ['./author-updatebook.component.css']
})
export class AuthorUpdatebookComponent implements OnInit {

  book: Book = new Book();
  bookId!: number;

  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => { 
      console.log("params: " + params);
      this.bookId = Number(params.get("bookId")); 

      this.bookService.getBookById(this.bookId).subscribe(
        data => {
          this.book = data;
        },
        error => {
          console.log(error);
        }
      );

  });

  }

}
