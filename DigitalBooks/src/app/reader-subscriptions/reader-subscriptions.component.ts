import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService, private bookService: BookService) { }

  ngOnInit(): void {

    this.userId = Number(sessionStorage.getItem('userId'));
    
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

  readBook(){

  }

  cancelSubscription(subscriptionId: number){

  }


}

export class UserSubscriptionsTemplate{
  user!: User;
  userSubscriptions!: Subscription[];

}
