import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../cart/shopping-cart';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'bs-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss']
})
export class CartPopupComponent extends ShoppingCart implements OnInit {
  
  constructor(protected cartService: CartService) {
    super(cartService);
  }

  ngOnInit() {
  }

}
