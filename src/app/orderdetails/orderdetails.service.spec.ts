import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Orderdetails } from './orderdetails';
import { OrderdetailsService } from './orderdetails.service';

describe('OrdertailsService', () => {
  let service: OrderdetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderdetailsService]
    });
    service = TestBed.inject(OrderdetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should place an order', () => {
    const mockOrder: Orderdetails = {
      orderId: 123,
      loginId: 'user1',
      id: '1',
      productName: 'Motorola Phone',
      price: 40000,
      quantity: 2,
      imageUrl:'abcderfg',
      date: '23/06/2024'
      
      }; 

    service.placeOrder(mockOrder).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(`${service.dbUrl}order`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockOrder); 
    req.flush(mockOrder);
  });


// // GET ALL THE ORDER
//   it('should retrieve all orders for the logged-in user', () => {
//     const mockOrders = [
//      {
//       orderId: 123,
//       loginId: 'user1',
//       id: '1',
//       productName: 'Motorola Phone',
//       price: 40000,
//       quantity: 2,
//       imageUrl:'abcderfg',
//       date: '23/06/2024'
//      },
//     ]; 

//     service.getAllOrdersByUser().subscribe(orders => {
//       expect(orders.length).toBe(2);
//       expect(orders).toEqual(mockOrders);
//     });

//     const req = httpMock.expectOne(`${service.dbUrl}orders/user`); 
//     expect(req.request.method).toBe('GET');
//     req.flush(mockOrders); 
//   });

it('should fetch all orders by user', () => {
  const mockOrders: Orderdetails[] = [
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

  localStorage.setItem('loginId', '123'); // Mock login ID

  service.getAllOrdersByUser().subscribe((orders) => {
    expect(orders.length).toBe(1);
    expect(orders).toEqual(mockOrders);
  });

  const req = httpMock.expectOne(`${service.dbUrl}orders/123`);
  expect(req.request.method).toBe('GET'); // Ensure the request method is GET
  req.flush(mockOrders); // Respond with mock orders
});

it('should handle error response', () => {
  localStorage.setItem('loginId', '123'); // Mock login ID

  service.getAllOrdersByUser().subscribe({
    next: () => fail('should have failed with a 404 error'),
    error: (error) => {
      expect(error.status).toBe(404); // Check if error status is 404
    }
  });

  const req = httpMock.expectOne(`${service.dbUrl}orders/123`);
  req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a 404 error
});
 });

