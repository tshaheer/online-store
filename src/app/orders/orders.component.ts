import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { IOrder } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';

@Component({
  selector: 'bs-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
 orders: IOrder[] = [];

  constructor(private dataService: DataService, private toastrService: ToastrService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.dataService.getOrders().subscribe((res: HttpResponse<IOrder[]>) => {
      this.orders = res.body;
    }, (res: HttpErrorResponse) => this.onError(res.message));
  }

  viewOrderDetail() {
    this.showOrderDetailsModal();
  }

  private showOrderDetailsModal(): Promise<boolean> {
    const modalContent: IModalContent = {
      header: 'Order Detail',
      body: this.getOrderDetailsHtml(),
      OKButtonText: 'OK',
      cancelButtonVisible: false
    };
    return this.modalService.show(modalContent);
  }

  private getOrderDetailsHtml(): string {
    return `Hello`;
  }

  private onError(errorMessage: string) {
    this.toastrService.error(errorMessage, 'Error')
  }

}
