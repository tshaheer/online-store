import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBook } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private booksBaseUrl = 'api/books.json';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<HttpResponse<IBook[]>> {
    return this.http.get<IBook[]>(this.booksBaseUrl, { observe: 'response' });
  }

  getBooksByCategory(category: string): Observable<IBook[]> {
    return this.getBooks().pipe(map(res => {
      const books = res.body as IBook[];
      return books.filter((book: IBook) => {
        return book.category.toLowerCase() == category.toLowerCase()
      });
    })
    );
  }

}
