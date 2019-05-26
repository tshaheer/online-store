import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { IBook } from 'src/app/shared/interfaces';

@Component({
  selector: 'bs-books-card',
  templateUrl: './books-card.component.html',
  styleUrls: ['./books-card.component.scss'],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksCardComponent implements OnInit {
  @Input() books: IBook[] = [];

  @Output() cartChanged: EventEmitter<IBook> = new EventEmitter<IBook>();

  constructor() { }

  ngOnInit() {
  }

  addToCart(book: IBook) {
    this.cartChanged.emit(book);
  }

}
