import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable, of, throwError } from 'rxjs';

import { IUserLogin, IAccount } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  redirectUrl: string;

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) { }

  save(account: IAccount): Observable<HttpResponse<IAccount>> {
    //return this.http.post(SERVER_API_URL + 'api/register', account, { observe: 'response' });
    let users = this.getUsers();
    if (users.find(u => u.email === account.email)) {
      this.error('Username "' + account.email + '" is already taken')
    }
    users.push(account);
    this.localStorage.store('users', JSON.stringify(users));
    return this.ok(account);
  }

  login(userLogin: IUserLogin): Observable<boolean> {
    let authenticated = false;
    let users = this.getUsers();
    const user = users.find(u => u.email === userLogin.email && u.password === userLogin.password);
    if (user) {
      this.sessionStorage.store("authenticatedUser", userLogin.email);
      authenticated = true;
    }
    return of(authenticated);
  }

  logout() {
    this.sessionStorage.clear('authenticatedUser');
  }

  isAuthenticated(): boolean {
    let user = this.sessionStorage.retrieve('authenticatedUser');
    return !(user === null)
  }

  // helper functions
  private getUsers(): IAccount[] {
    return JSON.parse(this.localStorage.retrieve('users')) || [];
  }

  private ok(body?) {
    return of(new HttpResponse({ status: 200, body }));
  }

  private error(message: string) {
    return throwError(new HttpErrorResponse({ error: message }));
  }

}
