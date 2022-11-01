import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class JwtUtilService {

  jwtToken!: string;

   constructor() { }

   getDecodedAccessToken(token: string): any {
    try {
      console.log("Decoding token");
      console.log(token);
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  getToken(): string{
    return this.jwtToken;
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
      this.saveTokenInSession(this.jwtToken);
    }
  }

  saveTokenInSession(token: string){
    let tokenStr= 'Bearer '+ token;
    console.log("Storing token in session: ");
    console.log(tokenStr);
    sessionStorage.setItem('token', tokenStr);
  }

  logout(){
    window.sessionStorage.clear();
  }

  // decodeToken() {
  //   if (this.jwtToken) {
  //   this.decodedToken = jwt_decode(this.jwtToken);
  //   }
  // }

  // getDecodeToken() {
  //   return jwt_decode(this.jwtToken);
  // }

  // getUser() {
  //   this.decodeToken();
  //   return this.decodedToken ? this.decodedToken.displayname : null;
  // }

  // getEmailId() {
  //   this.decodeToken();
  //   return this.decodedToken ? this.decodedToken.email : null;
  // }

  // getExpiryTime() {
  //   this.decodeToken();
  //   return this.decodedToken ? this.decodedToken.exp : null;
  // }

  // isTokenExpired(): boolean {
  //   const expiryTime: number = this.getExpiryTime();
  //   if (expiryTime) {
  //     return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
  //   } else {
  //     return false;
  //   }
  // }

}
