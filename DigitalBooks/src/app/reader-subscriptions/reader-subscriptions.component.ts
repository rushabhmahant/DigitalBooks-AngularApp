import { Component, OnInit } from '@angular/core';
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
  userSubscriptions!: Subscription[];
  userSubscriptionsTemplate!: UserSubscriptionsTemplate;
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userId = Number(sessionStorage.getItem('userId'));
    this.userService.getUserSubscriptions(this.userId).subscribe(
      data => {
        this.userSubscriptionsTemplate = data;
        this.userSubscriptions = this.userSubscriptionsTemplate.userSubscriptions;
      },
      error => console.log(error)
    );
  }

  readBook(){

  }

  cancelSubscription(){
    
  }


}

export class UserSubscriptionsTemplate{
  user!: User;
  userSubscriptions!: Subscription[];

}
