import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckoutRoutingModule } from './checkout-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CheckoutRoutingModule
  ],
  declarations: [CheckoutRoutingModule.components],
  providers: [ CurrencyPipe ]
})
export class CheckoutModule { }
