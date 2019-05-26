import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { QuantityControlComponent } from './quantity-control/quantity-control.component';
import { CartPopupComponent } from './cart-popup/cart-popup.component';


library.add(fas);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [CommonModule, NgbModule, FontAwesomeModule, QuantityControlComponent, CartPopupComponent],
  declarations: [QuantityControlComponent, CartPopupComponent]
})
export class SharedModule { }
