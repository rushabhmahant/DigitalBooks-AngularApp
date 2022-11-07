import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Subscription } from '../subscription';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reader-subscriptions',
  templateUrl: './reader-subscriptions.component.html',
  styleUrls: ['./reader-subscriptions.component.css']
})
export class ReaderSubscriptionsComponent implements OnInit {

  userId!: number;
  user!: User;
  userDisplayName!: string;
  userSubscriptions!: Subscription[];
  userSubscriptionsTemplate!: UserSubscriptionsTemplate;

  constructor(private userService: UserService, private bookService: BookService,
    private router: Router, private appComponent: AppComponent) {
      console.log("Inside reader-subscriptions component constructor");
    this.appComponent.showHomeBtn(true);
    this.appComponent.showLoginBtn(false);
    this.appComponent.showSignupBtn(false);
    this.appComponent.showLogoutBtn(true);
     }

  ngOnInit(): void {

    this.userId = Number(sessionStorage.getItem('userId'));
    
    this.loadSubscriptions();
  }

  loadSubscriptions(){
    this.userService.getUserSubscriptions(this.userId).subscribe(
      data => {
        this.userSubscriptionsTemplate = data;
        this.user = this.userSubscriptionsTemplate.user;
        this.userDisplayName = this.userSubscriptionsTemplate.user.userFirstName.charAt(0).toUpperCase() 
          + this.userSubscriptionsTemplate.user.userFirstName.slice(1).toLowerCase();
        this.userSubscriptions = this.userSubscriptionsTemplate.userSubscriptions;
      },
      error => console.log(error)
    );
  }

  readBook(bookId: number){
    this.router.navigate(['reader-readbook', bookId]);
  }

  checkSubscribedDate(subscriptionDate: Date){
    const now = new Date();
    const subDate = new Date(subscriptionDate);
    //console.log(now.getDate() - subDate.getDate());
    console.log(now.getDate());
    console.log(subDate.getDate())
    if(now.getDate() - subDate.getDate() <=1){
      return true;
    }
    return false;
  }

  cancelSubscription(subscription: Subscription){

    if(confirm("Cancel subscription for " + subscription.bookTitle + "?")){
      this.userService.removeSubscription(this.userId, subscription.subscriptionId).subscribe(
        data => {
          console.log("Subscription cancelled");
          this.loadSubscriptions();
        },
        error => {
          alert("Error occurred while cancelling subscription, please try again later");
          console.log(error);
        }
      );

    }
    
  }


}

export class UserSubscriptionsTemplate{
  user!: User;
  userSubscriptions!: Subscription[];

}
