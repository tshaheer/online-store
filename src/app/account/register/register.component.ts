import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../../core/services/account.service';
import { ValidationService } from '../../core/services/validation.service';
import { IAccount } from '../../shared/interfaces';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'bs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }

  submit({ value, valid }: { value: IAccount, valid: boolean }) {
    this.accountService.save(value)
      .subscribe((res: HttpResponse<IAccount>) => {
        this.toastrService.success("Your account have been successfully registered.");
        this.router.navigateByUrl("/login");
      }, response => this.processError(response));
  }

  private processError(response: HttpErrorResponse) {
    if (response.status === 400 && response.error.type === "LOGIN_ALREADY_USED_TYPE") {
      this.toastrService.error("User already exists", 'ERROR');
    } else if (response.status === 400 && response.error.type === "EMAIL_ALREADY_USED_TYPE") {
      this.toastrService.error("Email already exists", 'ERROR');
    } else {
      this.toastrService.error(response.error.errorMessage, 'ERROR');
    }
  }

}
