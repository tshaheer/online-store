import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'books', loadChildren: './books/books.module#BooksModule' },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
  { path: '', pathMatch: 'full' , redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
