import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { OrderdetailsComponent } from './orderdetails.component';
import { OrderdetailsService } from './orderdetails.service';

describe('OrderdetailsComponent', () => {
  let component: OrderdetailsComponent;
  let fixture: ComponentFixture<OrderdetailsComponent>;
  let orderService: jasmine.SpyObj<OrderdetailsService>;

  beforeEach(async () => {
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getAllOrdersByUser']);

    await TestBed.configureTestingModule({
      declarations: [OrderdetailsComponent],
      imports : [HttpClientTestingModule],
      schemas : [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: OrderdetailsService, useValue: orderServiceSpy }
      ]
    })
    .compileComponents();

    orderService = TestBed.inject(OrderdetailsService) as jasmine.SpyObj<OrderdetailsService>;
    fixture = TestBed.createComponent(OrderdetailsComponent);
    component = fixture.componentInstance;
   
    spyOn(component, 'extractPrices').and.callThrough();
    spyOn(component, 'calculateTotalPrice').and.callThrough();
  });

  it('should fetch all orders successfully', () => {
    const mockOrders = [
           {
            orderId: 123,
            loginId: 'user1',
            id: '1',
            productName: 'Motorola Phone',
            price: 40000,
            quantity: 2,
            imageUrl:'abcderfg',
            date: '23/06/2024'
           },
          ]; 

    // Mock the service to return an observable with mock orders
    orderService.getAllOrdersByUser.and.returnValue(of(mockOrders));

    component.getAllOrders(); // Call the method

    expect(orderService.getAllOrdersByUser).toHaveBeenCalled(); // Ensure the service was called
    expect(component.order).toEqual(mockOrders); // Check if the orders were set correctly
    expect(component.extractPrices).toHaveBeenCalled(); // Assuming extractPrices is a method you want to check
    expect(component.calculateTotalPrice).toHaveBeenCalled(); // Assuming calculateTotalPrice is a method you want to check
  });

  // it('should handle error when fetching orders', () => {
  //   // Mock the service to return an observable that throws an error
  //   orderService.getAllOrdersByUser.and.returnValue(throwError('Error fetching orders'));

  //   spyOn(console, 'log'); // Spy on console.log to check error logging

  //   component.getAllOrders(); // Call the method

  //   expect(orderService.getAllOrdersByUser).toHaveBeenCalled(); // Ensure the service was called
  //   expect(console.log).toHaveBeenCalledWith('Error fetching orders'); // Check if the error was logged
  // });
});
