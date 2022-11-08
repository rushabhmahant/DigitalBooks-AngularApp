import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book';
import { BookService } from '../book.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { Subscription } from '../subscription';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  searchForm!: FormGroup;
  userId!: number;  // crrent user
  books!: Book[];
  _userSubscribedBooks: number[] = [];
  titleSearch!: string;
  categorySearch!: string;
  authorSearch!: string;
  priceSearch!: number;
  // For displaying logo
  logoId!: number;
  base64Data: any;
  retrievedLogo: any;
  logoMap = new Map();

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private bookService: BookService, private router: Router, private appComponent: AppComponent) {
      console.log("Inside reader component constructor");
    this.appComponent.showHomeBtn(true);
    this.appComponent.showLoginBtn(false);
    this.appComponent.showSignupBtn(false);
    this.appComponent.showLogoutBtn(true);
     }

  ngOnInit(): void {

    this.userId = Number(sessionStorage.getItem('userId'));

    this.searchForm = this.formBuilder.group({
      title:[''],
      category:[''],
      author:[''],
      //  price:['', Validators.pattern(/^[0-9]\d*$/)], --> Becomes red with decimal values
      price:['']
    })

    this.bookService.getAllBooks().subscribe(
      data => {this.books = data;
        this.books.forEach(book => {
          if(book.logo != null && book.logo != undefined){
            console.log("Getting logo for "); console.log(book.bookId);
            this.loadLogo(book.bookId, book.logo.logoId);
          }
          
         });
      },
      error => console.log("Error while fetching books for reader: " + error)
    );

    this.loadUserSubscriptions();

  }

  loadLogo(bookId: number, logoId: number){
    this.bookService.getLogoById(logoId).subscribe(
      data => {
        console.log("Single Logo received");
        console.log(data);
        this.base64Data = data.logoBytes;
        this.retrievedLogo = 'data:image/png;base64,' + this.base64Data;
        this.logoMap.set(bookId, this.retrievedLogo);
      }
    );
  }

  loadUserSubscriptions(){
    this.userService.getUserSubscriptions(this.userId).subscribe(
      data => {
        console.log(data);
        console.log(data.userSubscriptions);
        for(var subscription of data.userSubscriptions){
          console.log("Inside for");
          console.log(subscription);
          this._userSubscribedBooks.push(subscription.bookId);
        }
      },
      error => {
        console.log("Error occurred while subscribing book")
        console.log(error);
      }
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

  addSubscription(book: Book) {
    console.log("Loading subscriptions..");
    this.loadUserSubscriptions();
    console.log("Subscriptions loaded");
    console.log(this._userSubscribedBooks);
    var subscribedBookFlag: boolean = false;
    for(var i=0; i<this._userSubscribedBooks.length;i++){
      console.log(this._userSubscribedBooks);
      if(this._userSubscribedBooks[i] == book.bookId){
        //  Also Check if user cancels the subscription at a later point of time after subscribing it
        console.log("Already subscribed...");
        subscribedBookFlag = true;
        alert("You have already subscribed to this book !");
        break;
      }
      
    }

    if(!subscribedBookFlag){
      this.userService.addSubscription(this.userId, book.bookId).subscribe(
        data => {
          console.log("Adding subscription...");
          alert("Subscription added successfully. \nSubscription Id: " 
            + data.subscriptionId + " \nSubscription Price: &#8377;" + data.subscriptionPrice);
          this._userSubscribedBooks.push(data.bookId);
        },
        error => {
          console.log(error)
        }
      );
    }

  }

  userSubscribedBooks(){
    //  Navigate to list of user subscribed books
    this.router.navigate(['reader-subscriptions']);
  }

  userSubscriptions(){
    this.router.navigate(['reader-subscriptions']);
  }

  @HostListener('window:popstate', ['$event'])
onBrowserBackBtnClose(event: Event) {
    console.log('back button pressed');
    event.preventDefault(); 
    this.appComponent.goToHomePage();
}

}
