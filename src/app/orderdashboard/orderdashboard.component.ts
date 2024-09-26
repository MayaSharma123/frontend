import { Component } from '@angular/core';
import { Orderdetails } from '../orderdetails/orderdetails';
import { OrderdashboardService } from './orderdashboard.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orderdashboard',
  templateUrl: './orderdashboard.component.html',
  styleUrl: './orderdashboard.component.css',
})
export class OrderdashboardComponent {
  order: Array<Orderdetails> = [];
  constructor(
    private orderDashboardService: OrderdashboardService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.viewProducts();
  }

  viewProducts() {
    this.orderDashboardService.getAllOrdersByUser().subscribe(
      (data) => {
        this.order = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
