import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';
import { UserSubscriptionsTemplate } from './reader-subscriptions/reader-subscriptions.component';
import { Subscription } from './subscription';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:9191/userservice"

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:9191/userservice/users");
  }

  getUserById(userId: number): Observable<User>{
    return this.httpClient.get<User>("http://localhost:9191/userservice/user/" + userId);
  }

  signup(user: User, roleId: number): Observable<User>{
    return this.httpClient.post<User>("http://localhost:7001/userservice/signup/" + roleId, user)
  }

  //  Reader APIs

  getUserSubscriptions(userId: number): Observable<UserSubscriptionsTemplate>{
    return this.httpClient.get<UserSubscriptionsTemplate>("http://localhost:7001/api/v1/digitalbooks/userservice/readers/"+userId+"/subscriptions");
  }

  addSubscription(userId: number, bookId: number): Observable<Subscription>{
    return this.httpClient.post<Subscription>("http://localhost:7001/api/v1/digitalbooks/userservice/readers/" + userId + "/subscribe/" + bookId, {});
  }

  //  Author APIs

  setBookBlockedStatus(userId: number, bookId: number, bookBlockedtatus: string, book: Book): Observable<Book>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("block",bookBlockedtatus);
    return this.httpClient.post<Book>("http://localhost:7001/api/v1/digitalbooks/userservice/author/"+ userId +"/books/"+bookId, book, {params: queryParams});
  }

}
