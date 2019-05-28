import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AccountService } from 'src/app/core/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accountService.isAuthenticated()) {
        return true;
    }
    // Track URL user is trying to go to so we can send them there after logging in
    this.accountService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
