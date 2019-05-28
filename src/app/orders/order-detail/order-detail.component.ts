import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'bs-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: IOrder;
  
  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.dataService.getOrders().subscribe((res: HttpResponse<IOrder[]>) => {
      this.order = res.body[0];
    }, (res: HttpErrorResponse) => console.log(res.message));
  }

}
