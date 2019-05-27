import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../../core/services/account.service';
import { ValidationService } from '../../core/services/validation.service';
import { IUserLogin } from '../../shared/interfaces';


@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private toastrService: ToastrService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }

  submit({ value, valid }: { value: IUserLogin, valid: boolean }) {
    this.accountService.login(value)
      .subscribe((status: boolean) => {
        if (status) {
          this.toastrService.info('Login success');
          if (this.accountService.redirectUrl) {
            const redirectUrl = this.accountService.redirectUrl;
            this.accountService.redirectUrl = '';
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          const loginError = 'Unable to login';
          this.errorMessage = loginError;
          this.toastrService.error(loginError, 'ERROR');
        }
      },
        (err: any) => this.toastrService.error(err, 'ERROR'));
  }

}
