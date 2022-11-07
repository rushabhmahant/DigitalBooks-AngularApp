import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Logo } from '../logo';

@Component({
  selector: 'app-author-updatebook',
  templateUrl: './author-updatebook.component.html',
  styleUrls: ['./author-updatebook.component.css']
})
export class AuthorUpdatebookComponent implements OnInit {

  authorId: number = Number(sessionStorage.getItem('userId'));
  book: Book = new Book();
  bookId!: number;
  originalFileName!: string;

  //  Form values
  bookForm!: FormGroup
  title!: string;
  category!: string;
  author!: string;
  price!: number;
  content!: string;
  publisher!: string;
  publishedDate!: Date;
  selectedFile!: File;
  logo: Logo = new Logo();

  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService,
    private formBuilder: FormBuilder, private router: Router, private appComponent: AppComponent) {
      console.log("Inside author-updatebook component constructor");
    this.appComponent.showHomeBtn(true);
    this.appComponent.showLoginBtn(false);
    this.appComponent.showSignupBtn(false);
    this.appComponent.showLogoutBtn(true);
     }

  ngOnInit(): void {



    this.activatedRoute.paramMap.subscribe(params => { 
      console.log("params: " + params);
      this.bookId = Number(params.get("bookId")); 

      this.bookService.getBookById(this.bookId).subscribe(
        data => {
          this.book = data;
          if(this.book.logo){
            //this.selectedFile = this.book.logo;
            this.originalFileName = this.book.logo.logoName;
          }
        },
        error => {
          console.log(error);
        }
      );

  });

  this.bookForm = this.formBuilder.group({
    title:['',Validators.required],
    category: ['',Validators.required],
    author: ['',Validators.required],
    price: ['',Validators.required],
    content: ['',Validators.required],
    publisher: ['',Validators.required],
    publishedDate: ['',Validators.required],
  });

  }

  updateBook(){
    this.book.authorId = this.authorId;
    this.book.bookTitle = this.bookForm.get('title')?.value;
    console.log(this.book.bookTitle);
    this.book.bookCategory = this.bookForm.get('category')?.value;
    this.book.bookAuthor = this.bookForm.get('author')?.value;
    this.book.bookPrice = this.bookForm.get('price')?.value;
    this.book.bookContent = this.bookForm.get('content')?.value;
    this.book.bookLogo = "/path/to/logo";
    this.book.bookPublisher = this.bookForm.get('publisher')?.value;
    this.book.bookPublishedDate = this.bookForm.get('publishedDate')?.value;

    if(this.book.bookTitle == undefined || this.book.bookCategory == undefined || this.book.bookPrice == undefined || 
      this.book.bookContent == undefined || this.book.bookPublisher == undefined || this.book.bookPublishedDate == undefined
      || this.book.bookTitle == "" || this.book.bookCategory == "" || this.book.bookPrice == null || 
      this.book.bookContent == "" || this.book.bookPublisher == "" || this.book.bookPublishedDate.toString() == ""){
        alert("Please provide all the details. Image upload can be skipped");
      
    }
    else{
      console.log(isNaN(Number(this.book.bookPrice)));
      if(isNaN(Number(this.book.bookPrice))){
        alert("Please provide valid inputs");
      }
      else{
        console.log(this.book.bookPublishedDate);
    if(this.selectedFile != null && this.selectedFile != undefined){
      this.updateBookWithLogo();
    }else{
      // update book values other than logo here

      this.bookService.updateBook(this.book.authorId, this.book.bookId, this.book, 0).subscribe(
        data => {
          console.log("Book updated successfully");
          console.log(data);
          alert("Book updated successfully");
          this.router.navigate(['author']);
        },
        error => console.log(error)
      );

    }
    }
  }

  } // updateBook() ends here

  updateBookWithLogo(){
    console.log("Uploading logo " + this.selectedFile.name)
    console.log(this.selectedFile);
    //  send logoId as requestparam in service
    const formData: FormData = new FormData();

    formData.append('logoFile', this.selectedFile, this.selectedFile.name);

    this.bookService.uploadLogo(this.authorId, formData).subscribe(
      data => {
        console.log("Logo Uploaded successfully!");
        console.log(data);
        this.logo = data;
        this.book.logo = data;

        this.bookService.updateBook(this.book.authorId, this.book.bookId, this.book, this.book.logo.logoId).subscribe(
          data => {
            console.log("Book updated successfully");
            alert("Book updated successfully");
            this.router.navigate(['author']);
          },
          error => console.log(error)
        );

      }
    );

  }

  goBack(){
    this.router.navigate(['author']);
  }

  onFileChanged(event: any){
    console.log("onFileChanged() called...");
    const file = event.target.files[0];
    console.log(file);
    console.log(file.size);
    if(file.size>51200){  // 153600 for 150kb, 51200 for 50 kb
      alert("Image size is too large. Please ensure image size is less than 50kb");
    }else{
    this.selectedFile = file;
    console.log(this.selectedFile);
    console.log(this.selectedFile.name);
    }
  }

}
