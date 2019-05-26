import { Component } from '@angular/core';

import { ShoppingCart } from './shopping-cart';
import { CartService } from '../core/services/cart.service';
import { ICart } from '../shared/interfaces';

@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends ShoppingCart {

  constructor(protected cartService: CartService) {
    super(cartService)
  }

  changeQuantity(cart: ICart, quantity: number) {
    cart.quantity = quantity;
    this.cartService.reloadCart(this.cartList);
  }

}
