import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { response } from 'express';
import {Product} from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ProductService]
    });
   
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });
 
  afterEach(()=> {
    httpMock.verify();
  });

  it('should get a product',()=>{
    const mockProducts = [
    {
      productId: 1,
      productName: "OnePlus",
      productDesc: "Earbuds",
      price: 2999,
      features:"Good",
      quantity:20,
      imageUrl: "abcder",
      productStatus: "In Stock",
    },
     {
      productId: 2,
      productName: 'Motorola',
      productDesc: 'phone',
      price: 40000,
      features:'Good',
      quantity: 1,
      imageUrl: 'ajhdgd',
      productStatus: 'In Stock',
    },
  ];
   const mockResponse = {
     success : true,
     message : 'Product Added Successfully'
   };

   service.getAllProducts().subscribe(products => {
    expect(products.length).toBe(2);
    expect(products).toEqual(mockProducts);
  });

  const req = httpMock.expectOne(service.dbUrl + 'all');
  expect(req.request.method).toBe('GET');
  req.flush(mockProducts); 
});

});
