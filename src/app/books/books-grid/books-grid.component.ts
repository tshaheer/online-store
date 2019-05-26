import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from 'src/app/shared/interfaces';

@Component({
  selector: 'bs-books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss'],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksGridComponent implements OnInit {
  @Input() books: IBook[] = [];

  @Output() cartChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    this.cartChanged.emit();
  }

}
