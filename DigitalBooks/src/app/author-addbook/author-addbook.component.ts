import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Logo } from '../logo';

@Component({
  selector: 'app-author-addbook',
  templateUrl: './author-addbook.component.html',
  styleUrls: ['./author-addbook.component.css']
})
export class AuthorAddbookComponent implements OnInit {

  bookForm!: FormGroup
  book: Book = new Book();
  authorId: number = Number(sessionStorage.getItem('userId'));
  //  Form values
  title!: string;
  category!: string;
  author!: string;
  price!: number;
  content!: string;
  publisher!: string;
  publishedDate!: Date;
  selectedFile!: File;
  logo: Logo = new Logo();

  retrievedImage!: any;
  message!: string;
  imagename!: string;


  constructor(private formBuilder: FormBuilder, private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
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

  uploadLogo(){
    //  Save logo in db first

    
  }

  addBook(){
    console.log("Uploading")
    console.log(this.selectedFile);
    //  send logoId as requestparam in service
    if(this.selectedFile != null && this.selectedFile != undefined){
    const formData: FormData = new FormData();

    formData.append('logoFile', this.selectedFile, this.selectedFile.name);

    this.bookService.uploadLogo(this.authorId, formData).subscribe(
      data => {
        console.log("Logo Uploaded successfully!");
        console.log(data);
        this.logo = data;
        this.book.logo = data;
        this.createBook();
      }
    );
    }
    else{
      this.createBook();
    }

    
    

  }

  createBook(){

    this.book.authorId = this.authorId;
    this.book.bookTitle = this.bookForm.get('title')?.value;
    this.book.bookCategory = this.bookForm.get('category')?.value;
    this.book.bookAuthor = this.bookForm.get('author')?.value;
    this.book.bookPrice = this.bookForm.get('price')?.value;
    this.book.bookContent = this.bookForm.get('content')?.value;
    this.book.bookLogo = "/path/to/logo";
    this.book.bookPublisher = this.bookForm.get('publisher')?.value;
    this.book.bookPublishedDate = this.bookForm.get('publishedDate')?.value;

      this.bookService.createBook(this.authorId, this.book, this.logo.logoId).subscribe(
        data => {
          console.log("Add book successful !");
          console.log(data);
          alert("Book " + this.book.bookTitle + " created successfully !");
          this.router.navigate(['author']);
        },
        error => {
          console.log("Add book Unsuccessful");
          console.log(error);
          alert("Cannot create book, please try again later");
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
    
    //this.bookForm.get('selectedFile')?.setValue(file);
    this.selectedFile = file;
    console.log(this.selectedFile);
    console.log(this.selectedFile.name);
  }

  onUpload(){

  }

  getImage(){

  }

  

}
