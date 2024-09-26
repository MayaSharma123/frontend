import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderdashboardComponent } from './orderdashboard.component';
import { OrderdashboardService } from './orderdashboard.service';
import { DatePipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { Orderdetails } from '../orderdetails/orderdetails';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OrderdashboardComponent', () => {
  let component: OrderdashboardComponent;
  let fixture: ComponentFixture<OrderdashboardComponent>;
  let orderDashboardService: jasmine.SpyObj<OrderdashboardService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('OrderdashboardService', [
      'getAllOrdersByUser',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      
     schemas : [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [OrderdashboardComponent],
      providers: [{ provide: OrderdashboardService, useValue: spy }, DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderdashboardComponent);
    component = fixture.componentInstance;
    orderDashboardService = TestBed.inject(
      OrderdashboardService
    ) as jasmine.SpyObj<OrderdashboardService>;
  });

  

  it('should fetch all orders on init', () => {
    const mockOrders: Orderdetails[] = [new Orderdetails(), new Orderdetails()];
    orderDashboardService.getAllOrdersByUser.and.returnValue(of(mockOrders));

    component.ngOnInit();

    expect(component.order).toEqual(mockOrders);
  });

  it('should handle error when fetching orders', () => {
    const consoleSpy = spyOn(console, 'log');
    orderDashboardService.getAllOrdersByUser.and.returnValue(
      throwError('error')
    );

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('error');
  });

  it('should call viewProducts method on init', () => {
    spyOn(component, 'viewProducts');
    component.ngOnInit();
    expect(component.viewProducts).toHaveBeenCalled();
  });

  it('should set order data correctly in viewProducts', () => {
    const mockOrders: Orderdetails[] = [new Orderdetails(), new Orderdetails()];
    orderDashboardService.getAllOrdersByUser.and.returnValue(of(mockOrders));

    component.viewProducts();

    expect(component.order).toEqual(mockOrders);
  });

  it('should handle error in viewProducts', () => {
    const consoleSpy = spyOn(console, 'log');
    orderDashboardService.getAllOrdersByUser.and.returnValue(
      throwError('error')
    );

    component.viewProducts();

    expect(consoleSpy).toHaveBeenCalledWith('error');
  });
});
