import { Component } from '@angular/core';
import { OrderdetailsService } from './orderdetails.service';
import { Orderdetails } from './orderdetails';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css',
})
export class OrderdetailsComponent {
  order: Array<Orderdetails> = [];
  prices: number[] = [];
  totalPrice: number | any;
  constructor(private orderService: OrderdetailsService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrdersByUser().subscribe(
      (data) => {
        this.order = data;
        this.extractPrices();
        this.calculateTotalPrice();
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  calculateTotalPrice() {
    this.totalPrice = this.prices.reduce((acc, price) => acc + price, 0);
    // console.log(this.totalPrice);
  }

  extractPrices() {
    this.prices = this.order.map((order) => order.price);
    // console.log(this.prices);
  }
}
