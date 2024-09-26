import { Orderdetails } from './../orderdetails/orderdetails';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { Router } from '@angular/router';
import { OrderdetailsService } from '../orderdetails/orderdetails.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  term: string | any;
  
  constructor(
    private productService: ProductService,
    private orderService: OrderdetailsService,
    private router: Router
  ) {}

  data: any = {};
  p: Product = new Product();
  order: Orderdetails = new Orderdetails();
  products: Array<Product> = [];

  ngOnInit(): void {
    this.viewProducts();
  }

  viewProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  placeOrder(x: any) {
    this.order.loginId = localStorage.getItem('loginId');
    this.order.id = x.id;
    this.order.price = x.price;
    this.order.productName = x.productName;
    this.order.imageUrl = x.imageUrl;
    this.order.quantity = 1;
    this.orderService.placeOrder(this.order).subscribe(
      (data) => {
        // console.log(data);
        this.router.navigateByUrl('/order');
      },
      (error) => {
        console.log(error);
      }
    );
    this.order = new Orderdetails();
  }
}
