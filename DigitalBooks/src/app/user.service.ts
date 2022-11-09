import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';
import { UserSubscribedBooksTemplate } from './reader-books/reader-books.component';
import { UserSubscriptionsTemplate } from './reader-subscriptions/reader-subscriptions.component';
import { Subscription } from './subscription';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://Digitalbooksuserservice-env.eba-f5cp5wvg.ap-northeast-1.elasticbeanstalk.com/api/v1/digitalbooks/userservice"
  //private baseUrl = "http://localhost:7001/api/v1/digitalbooks/userservice"
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseUrl+"/users");
  }

  getUserById(userId: number): Observable<User>{
    return this.httpClient.get<User>(this.baseUrl+"/user/" + userId);
  }

  signup(user: User, roleId: number): Observable<User>{
    return this.httpClient.post<User>(this.baseUrl+"/signup/" + roleId, user)
  }

  //  Reader APIs

  getUserSubscriptions(userId: number): Observable<UserSubscriptionsTemplate>{
    return this.httpClient.get<UserSubscriptionsTemplate>(this.baseUrl+"/readers/"+userId+"/subscriptions");
  }

  addSubscription(userId: number, bookId: number): Observable<Subscription>{
    return this.httpClient.post<Subscription>(this.baseUrl+"/readers/" + userId + "/subscribe/" + bookId, {});
  }

  removeSubscription(userId: number, subscriptionId: number): Observable<Object>{
    return this.httpClient.delete<Object>(this.baseUrl + "/readers/"+userId + "/removesubscription/" + subscriptionId)
  }

  getUserSubscribedBooks(userId: number): Observable<UserSubscribedBooksTemplate>{
    return this.httpClient.get<UserSubscribedBooksTemplate>(this.baseUrl + "/readers/"+userId + "/books");
  }
  

  //  Author APIs

  setBookBlockedStatus(userId: number, bookId: number, bookBlockedtatus: string, book: Book): Observable<Book>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("block",bookBlockedtatus);
    return this.httpClient.post<Book>(this.baseUrl+"/author/"+ userId +"/books/"+bookId, book, {params: queryParams});
  }

}
