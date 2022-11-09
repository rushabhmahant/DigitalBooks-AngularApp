import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://Digitalbooksuserservice-env.eba-f5cp5wvg.ap-northeast-1.elasticbeanstalk.com/api/v1/digitalbooks/userservice";
  //private baseUrl = "http://localhost:7001/api/v1/digitalbooks/userservice"
  authRequest = new AuthRequest();

  constructor(private httpClient: HttpClient) { }


  login(username: string, password: string): Observable<AuthResponse>{
    this.authRequest.username = username;
    this.authRequest.password = password;
    console.log("username and password: " + this.authRequest.username + ", " + this.authRequest.password);
    return this.httpClient.post<AuthResponse>(this.baseUrl+"/authenticate", 
    this.authRequest).pipe(
      map(
        authResponse => {
         sessionStorage.setItem('username',username);
         let tokenStr= 'Bearer '+authResponse.jwtToken;
         sessionStorage.setItem('token', tokenStr);
         return authResponse;
        }
      )
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

}

export class AuthRequest{
  username!: string;
  password!: string;
}

export class AuthResponse{
  username!: string;
  jwtToken!: string;
}
