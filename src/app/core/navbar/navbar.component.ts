import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: boolean;

  constructor(private router: Router) {
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() {
    return false;
  }

  logout() {
    this.collapseNavbar();
    this.router.navigate(['']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}
