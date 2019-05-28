import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBook, IOrder } from 'src/app/shared/interfaces';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private booksBaseUrl = 'api/books.json';
  orders: IOrder[]= [];

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getBooks(): Observable<HttpResponse<IBook[]>> {
    return this.http.get<IBook[]>(this.booksBaseUrl, { observe: 'response' });
  }

  getNewBooks(): Observable<HttpResponse<IBook[]>> {
    return this.getBooks().pipe(map(res => {
      if (res.body) {
        return res.clone({ body: res.body.slice(1).slice(-3) });
      } else {
        return res;
      }
    })
    );
  }

  getBooksByCategory(category: string): Observable<IBook[]> {
    return this.getBooks().pipe(map(res => {
      const books: IBook[] = res.body;
      return books.filter((book: IBook) => {
        return book.category.toLowerCase() == category.toLowerCase()
      });
    })
    );
  }

  saveOrder(order: IOrder): Observable<HttpResponse<IOrder>> {
    this.orders.push(order);
    return of(new HttpResponse({ status: 200, body: order }));
  }

  getOrders(): Observable<HttpResponse<IOrder[]>> {
    let email = this.accountService.getLoggedInUser().email;
    let userOrders = this.orders.filter(o => email === o.email);
    return of(new HttpResponse({ status: 200, body: userOrders }));
  }

}
