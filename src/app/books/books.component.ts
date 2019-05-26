import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { IBook } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'bs-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  title: string;
  filteredBooks: IBook[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;

  constructor(private route: ActivatedRoute, 
    private dataService: DataService,
    private toastrService: ToastrService,
    private cartService: CartService) { }

  ngOnInit() {
    this.displayMode = DisplayModeEnum.Card;
    this.route.queryParams.subscribe((params: Params) => {
      const category = params['category'];
      if (category) {
        this.title = category + ' Books';
        this.loadBooksByCategory(category);
      } else {
        this.title = 'All Books';
        this.loadAll();
      }
    });
  }

  loadBooksByCategory(category: string) {
    this.dataService.getBooksByCategory(category).subscribe((books: IBook[]) => {
      this.filteredBooks = books;
    },(res: HttpErrorResponse) => this.onError(res.message));
  }

  loadAll() {
    this.dataService.getBooks().subscribe((res: HttpResponse<IBook[]>) => {
      this.filteredBooks = res.body;
    }, (res: HttpErrorResponse) => this.onError(res.message));
  }

  changeDisplayMode(mode: DisplayModeEnum) {
    this.displayMode = mode;
  }

  addItemToCart(book: IBook) {
    this.cartService.addToCart({ book, quantity: 1 })
    this.toastrService.info('Book successfully added to the cart', 'Add Book to Cart', {
      timeOut: 3000
    });
  }

  private onError(errorMessage: string) {
    this.toastrService.error(errorMessage, 'Error')
  }

}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
