 import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Orderdetails } from '../orderdetails/orderdetails'
// import { OrderdashboardService } from './orderdashboard.service';

// describe('OrderdashboardService', () => {
//   let service: OrderdashboardService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [OrderdashboardService]
//     });
//     service = TestBed.inject(OrderdashboardService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should retrieve all orders', () => {
//     const mockOrders = [
//       {
//       orderId: 123,
//       loginId: 'user1',
//       id: '1',
//       productName: 'Motorola Phone',
//       price: 40000,
//       quantity: 2,
//       imageUrl:'abcderfg',
//       date: '23/06/2024'
//      }
//     ];
//     service.getAllOrdersByUser().subscribe(orders => {
//       expect(orders.length).toBe(2);
//       expect(orders).toEqual(mockOrders);
//     });

//     const req = httpMock.expectOne(service.dbUrl + 'allorders'); 
//     expect(req.request.method).toBe('GET'); 
//     req.flush(mockOrders); 
//   });
// });
