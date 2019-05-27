import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { CartService } from '../services/cart.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: boolean;

  constructor(private router: Router, private toastrService: ToastrService,
    private cartService: CartService, private accountService: AccountService) {
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.collapseNavbar();
    this.accountService.logout();
    this.toastrService.info('Logged out.');
    this.router.navigate(['']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  toggleCartPopup(event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.toggleCart()
  }

}
