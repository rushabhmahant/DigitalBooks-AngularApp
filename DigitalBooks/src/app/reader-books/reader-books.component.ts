import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Book } from '../book';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reader-books',
  templateUrl: './reader-books.component.html',
  styleUrls: ['./reader-books.component.css']
})
export class ReaderBooksComponent implements OnInit {

  userId!: number;
  user!: User;
  selectedBook = new Book();
  userSubscribedBooks!: Book[];
  userSubscribedBooksTemplate!: UserSubscribedBooksTemplate;
  selectBookForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, 
    private matDialog: MatDialog, private dialogRef: MatDialogRef<ReaderBooksComponent>) { }

  ngOnInit(): void {

    this.userId = Number(sessionStorage.getItem('userId'));

    console.log("ReaderBooks component Initialized");
    this.selectBookForm = this.formBuilder.group({
      book:['',Validators.required],
    })
    
    this.loadUserSubscribedBooks();

  }

  loadUserSubscribedBooks(){
    this.userService.getUserSubscribedBooks(this.userId).subscribe(
      data => {
        this.userSubscribedBooksTemplate = data;
        this.user = data.user;
        this.userSubscribedBooks = data.userSubscribedBooks;
        console.log(this.userSubscribedBooks);
      },
      error => {
        console.log("Error occurred");
        console.log(error);
        alert("Error occurred while fetching your subscribed books, please try again later.");
      }
    );
  }

  readBook(){
    this.selectedBook = this.selectBookForm.get('book')?.value;
    console.log(this.selectedBook);
    console.log(this.selectedBook.bookId);
    if(this.selectedBook.bookId == null || this.selectedBook.bookId == undefined){
      alert("Please select a book from the list");
    }
    else if(this.selectedBook.bookBlockedStatus == 'B'){
      alert("Sorry, This book is blocked by its author!");
    }
    else{
      this.matDialog.closeAll();
      this.router.navigate(['reader-readbook', this.selectedBook.bookId]);
    }
  }

  checkSizeOfSubscribedBooks(){
    return this.userSubscribedBooks.length == 0 ? true : false;
  }

  exit(){
    let showLoginButtons = true;
    this.dialogRef.close(true);
  }

}

export class UserSubscribedBooksTemplate{
  user!: User;
  userSubscribedBooks!: Book[];

}
