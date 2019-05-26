import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { IBook } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';
import { CartService } from '../core/services/cart.service';


@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: IBook[] = [];

  constructor(private dataService: DataService, private cartService: CartService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.loadNewBooks();
  }

  loadNewBooks() {
    this.dataService.getNewBooks().subscribe((res: HttpResponse<IBook[]>) => {
      this.books = res.body;
    }, (res: HttpErrorResponse) => this.onError(res.message));
  }

  addToCart(book: IBook) {
    this.cartService.addToCart({ book, quantity: 1 })
    this.toastrService.info('Book successfully added to the cart', 'Add Book to Cart', {
      timeOut: 3000
    });
  }

  private onError(errorMessage: string) {
    this.toastrService.error(errorMessage, 'Error')
  }

}
