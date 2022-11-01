import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interceptor called");
    if (sessionStorage.getItem('token')) {
      console.log("Session has token: ");
      console.log(sessionStorage.getItem('token'));
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token') !
        }
      })
    }else{
      req = req.clone({
        setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json'
        }
    });
    }

    return next.handle(req);
  }
}
