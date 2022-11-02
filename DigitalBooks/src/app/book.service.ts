import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';
import { Subscription } from './subscription';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:9191/bookservice"

  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<Book[]>{
    // return this.httpClient.get<Book[]>("http://localhost:7002/bookservice/books");
    return this.httpClient.get<Book[]>("http://localhost:7001/api/v1/digitalbooks/userservice/author/getAllBooks");
  }

  getBookById(bookId: number): Observable<Book>{
    return this.httpClient.get<Book>("http://localhost:7002/bookservice/book/" + bookId);
  }

  searchBook(bookTitle: string, bookCategory: string, bookAuthor: string, bookPrice: number): Observable<Book[]>{
    console.log("Title: "+bookTitle);
    console.log("Cateogory: "+bookCategory);
    console.log("Author: "+bookAuthor);
    console.log("Price: "+bookPrice);
    let queryParams = new HttpParams();
    if(bookTitle != undefined && bookTitle != ""){
      queryParams = queryParams.append("title",bookTitle);
    }
    if(bookCategory != undefined && bookCategory != ""){
      queryParams = queryParams.append("category",bookCategory);
    }
    if(bookAuthor != undefined && bookAuthor != ""){
      queryParams = queryParams.append("author",bookAuthor);
    }
    if(bookPrice == undefined){
      queryParams = queryParams.append("price","");
      console.log("(If)Searching for title: "+bookTitle+", category: "+bookCategory+", author: "+bookAuthor+", price: "+bookPrice);
    }
    else{
    queryParams = queryParams.append("price",bookPrice);
    console.log("(Else)Searching for title: "+bookTitle+", category: "+bookCategory+", author: "+bookAuthor+", price: "+bookPrice);
    }
    return this.httpClient.get<Book[]>("http://localhost:7002/bookservice/search", {params: queryParams});
  }

  getUserSubscribedBooks(userId: number): Observable<Book[]>{
    return this.httpClient.get<Book[]>("http://localhost:7002/bookservice/readers/" + userId);
  }

  //  Here, userId is the same as authorId in mS
  createBook(userId: number, book: Book): Observable<Book>{
    return this.httpClient.post<Book>("http://localhost:7002/bookservice/author/" +userId + "/books", book);
  }

  //  Here, userId is the same as authorId in mS
  updateBook(userId: number, bookId: number, book: Book): Observable<Book>{
    return this.httpClient.put<Book>("http://localhost:7002/bookservice/author/" + userId + "/books/" + bookId, book);
  }

  setBookBlockedStatus(userId: number, bookId: number, bookBlockedtatus: string, book: Book): Observable<Book>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("status",bookBlockedtatus);
    return this.httpClient.post<Book>("http://localhost:7002/bookservice/author/"+ userId +"/books/ "+bookId, book, {params: queryParams});
  }

  //  Here, userId is the same as authorId in mS
  deleteBook(userId: number, bookId: Book): Observable<any>{
    return this.httpClient.delete("http://localhost:7002/bookservice/author/delete/" + userId +"/" +bookId);
  }


  //  Subscription services

  addSubscription(userId: number, bookId: number): Observable<Subscription>{
    return this.httpClient.post<Subscription>("http://localhost:7001/userservice/readers/" + userId + "/subscribe/" + bookId, {});
  }


}
