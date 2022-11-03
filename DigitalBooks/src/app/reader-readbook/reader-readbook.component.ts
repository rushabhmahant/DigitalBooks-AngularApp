import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reader-readbook',
  templateUrl: './reader-readbook.component.html',
  styleUrls: ['./reader-readbook.component.css']
})
export class ReaderReadbookComponent implements OnInit {

  bookId!: number;
  bookToRead = new Book();

  constructor(private userService: UserService, private bookService: BookService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => { 
      console.log("params: " + params);
      console.log("Number here: "+params.get("customerId"));
      this.bookId = Number(params.get("bookId")); 

      this.bookService.getBookById(this.bookId).subscribe(
        data => {
          this.bookToRead = data;
        },
        error => {
          console.log(error);
        }
      );

  });

  }

}
