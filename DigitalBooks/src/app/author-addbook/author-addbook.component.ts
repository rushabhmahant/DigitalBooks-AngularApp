import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book';

@Component({
  selector: 'app-author-addbook',
  templateUrl: './author-addbook.component.html',
  styleUrls: ['./author-addbook.component.css']
})
export class AuthorAddbookComponent implements OnInit {

  bookForm!: FormGroup
  book!: Book;
  authorId: number = Number(sessionStorage.getItem('userId'));
  //  Form values
  title!: string;
  category!: string;
  author!: string;
  price!: number;
  logo!: number;
  content!: string;
  publisher!: string;
  publishedDate!: Date;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title:['',Validators.required]
    });
  
  }

  addBook(){

  }

  goBack(){
    
  }

}
