import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../core/services/cart.service';
import { ShoppingCart } from '../cart/shopping-cart';
import { ValidationService } from '../core/services/validation.service';
import { DataService } from '../core/services/data.service';
import { IShipping, IOrder, IOrderItem } from '../shared/interfaces';
import { AccountService } from '../core/services/account.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'bs-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends ShoppingCart implements OnInit {
  checkoutForm: FormGroup;
  errorMessage: string;

  constructor(protected cartService: CartService,
    private formBuilder: FormBuilder, private router: Router,
    private toastrService: ToastrService, private dataService: DataService,
    private accountService: AccountService, private modalService: ModalService,
    private currencyPipe: CurrencyPipe) {
    super(cartService)
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      address1: ['', [Validators.required]],
      address2: ['']
    });
  }

  submit({ value, valid }: { value: IShipping, valid: boolean }) {
    let order = this.createOrder(value);
    this.dataService.saveOrder(order)
      .subscribe((res: HttpResponse<IOrder>) => {
        this.cartService.clearCart();
        this.showReceiptModal(order.orderTotal, order.orderNumber)
          .then(value => this.router.navigateByUrl('/home'));
      }, response => this.processError(response));
  }

  private createOrder(shipping: IShipping): IOrder {
    const user = this.accountService.getLoggedInUser();
    const order = {
      email: user.email,
      orderNumber: Math.floor(Math.random() * 100) + 1,
      orderDate: moment(),
      orderTotal: this.totalPrice,
      shipping: shipping,
      orderItems: this.getOrderItems()
    };
    return order;
  }

  private getOrderItems(): IOrderItem[] {
    let orderItems: IOrderItem[] = [];
    for (let cart of this.cartList) {
      let orderItem: IOrderItem = {
        item: cart.book,
        quantity: cart.quantity,
        total: cart.quantity * cart.book.price
      };
      orderItems.push(orderItem);
    }
    return orderItems;
  }

  private showReceiptModal(amount: number, orderNo: number): Promise<boolean> {
    const modalContent: IModalContent = {
      header: 'Order Receipt',
      body: this.getReceiptHtml(this.currencyPipe.transform(amount, 'USD'), orderNo),
      OKButtonText: 'OK',
      cancelButtonVisible: false
    };
    return this.modalService.show(modalContent);
  }

  private getReceiptHtml(amount: string, orderNo: number): string {
    return `<div class="row">
    <p class="small">
      Thank you for your Order, Your card has been charged <strong>${amount}</strong>. Your order
      number is <strong>${orderNo}</strong>. Please write down this order number number in case you
      need to refer to the order at future date. You will also be receiving
      a copy of your receipt via e-mail. We will begin processing your order
      right away. If you have any questions about your order, please feel
      free to contact us at <a href="mailto:contact@bookstore.com">contact@bookstore.com</a>
    </p>
  </div>`;
  }

  private processError(response: HttpErrorResponse) {
    this.toastrService.error(response.error.errorMessage, 'ERROR');
  }

}
