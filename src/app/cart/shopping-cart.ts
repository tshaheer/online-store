import { ICart } from '../shared/interfaces';
import { CartService } from '../core/services/cart.service';

export class ShoppingCart {
    public cartList: ICart[];
    public totalPrice: number;

    constructor(protected cartService: CartService) {
        this.loadCart();
    }

    loadCart() {
        this.cartService.cartListSubject.subscribe(res => {
            this.cartList = res;
            this.calculateTotal();
        });
    }

    removeFromCart(index: number) {
        this.cartService.removeCart(index);
    }

    private calculateTotal() {
        let total = 0;
        for (let cart of this.cartList) {
            total += cart.book.price * cart.quantity;
        }
        this.totalPrice = total;
    }

}
