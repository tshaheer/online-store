import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { SharedModule } from '../shared/shared.module';
import { BooksCardComponent } from './books-card/books-card.component';
import { BooksGridComponent } from './books-grid/books-grid.component';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ],
  declarations: [BooksRoutingModule.components]
})
export class BooksModule { }
