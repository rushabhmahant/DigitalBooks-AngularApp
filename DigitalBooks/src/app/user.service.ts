import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
