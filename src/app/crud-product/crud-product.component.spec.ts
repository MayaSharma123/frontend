import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CrudProduct } from './crud-product';

import { CrudProductComponent } from './crud-product.component';
import { CrudProductService } from './crud-product.service';

describe('CrudProductComponent', () => {
  let component: CrudProductComponent;
  let fixture: ComponentFixture<CrudProductComponent>;
  let crudProductService: jasmine.SpyObj<CrudProductService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const spy = jasmine.createSpyObj('CrudProductService', ['addProduct', 'deleteProduct', 'updateProduct']);
    TestBed.configureTestingModule({
      
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [CrudProductComponent],
      providers: [
        { provide: CrudProductService, useValue: spy },
        { provide: Router, useValue: routerSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudProductComponent);
    component = fixture.componentInstance;
    crudProductService = TestBed.inject(CrudProductService) as jasmine.SpyObj<CrudProductService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  
  });

  it('should add a product successfully', () => {
    const newProduct = new CrudProduct(); 
    crudProductService.addProduct.and.returnValue(of(newProduct)); 

    component.addProduct(); 

    expect(crudProductService.addProduct).toHaveBeenCalledWith(component.p); 
    expect(component.crudProducts.length).toBe(1);
    expect(component.crudProducts[0]).toBe(newProduct); 
    expect(component.p).toEqual(new CrudProduct()); 
  });

  it('should handle error when adding a product', () => {
    spyOn(window, 'alert'); 
    const errorResponse = { message: 'Error occurred' };
    crudProductService.addProduct.and.returnValue(throwError(errorResponse)); 

    component.addProduct(); 
    expect(crudProductService.addProduct).toHaveBeenCalledWith(component.p); 
    expect(window.alert).toHaveBeenCalledWith('Failed to add product. Please try again.'); 
    expect(component.crudProducts.length).toBe(0); 
  });

  // DELETE THE PRODUCT
  
  it('should delete a product successfully', () => {
    const productId = 1;
    const mockResponse = { success: true }; // Mock response from service

    component.crudProducts=[
      {
        id: 1,
        productName: 'OnePlus',
        productDesc: 'Earbuds',
        price: 2999,
        features:'Good',
        quantity:20,
        imageUrl: 'abcder',
        productStatus: 'OUT OF STOCK',
      },
    ];

    crudProductService.deleteProduct.and.returnValue(of(mockResponse));

    component.deleteProduct(productId);

    expect(crudProductService.deleteProduct).toHaveBeenCalledWith(productId);
    expect(component.crudProducts.length).toBe(0);
    expect(component.message).toBe('Product deleted successfully');
    expect(component.deleteProductId).toBeNull();
  });

  it('should handle error when deleting a product', () => {
    const productId = 1;
    const errorResponse = 'Error deleting product';

    component.crudProducts=[
      {
        id: 1,
        productName: 'OnePlus',
        productDesc: 'Earbuds',
        price: 2999,
        features:'Good',
        quantity:20,
        imageUrl: 'abcder',
        productStatus: 'OUT OF STOCK',
      },
    ];

    crudProductService.deleteProduct.and.returnValue(throwError(() => new Error(errorResponse)));

    component.deleteProduct(productId);

    expect(crudProductService.deleteProduct).toHaveBeenCalledWith(productId);
    expect(component.crudProducts.length).toBe(1); 
    expect(component.message).toBe('Product deleted failed');
    expect(component.deleteProductId).toBeNull();
  });

  it('should not delete if id is null', () => {
    component.deleteProduct(null);
    
    expect(crudProductService.deleteProduct).not.toHaveBeenCalled();
  });

  // UPDATE PRODUCT
  it('should update product successfully', () => {
    const mockProductId = 1;
    const mockProductData = {
      id: mockProductId,
      productName: 'OnePlus',
      productDesc: 'Phone',
      price: 29999,
      features: 'Good',
      quantity: 20,
      imageUrl: 'abcder',
      productStatus: 'OUT OF STOCK'
    };
    const updatedProduct = { ...mockProductData };

    // Mock the service to return an observable with the updated product
    crudProductService.updateProduct.and.returnValue(of(updatedProduct));

    component.crudProducts = [ {
      id: 1,
      productName: 'OnePlus',
      productDesc: 'Phone',
      price: 29999,
      features:'Good',
      quantity:20,
      imageUrl: 'abcder',
      productStatus: 'OUT OF STOCK',
    }
]; // Initial product list

    // Call the updateProduct method with the mockProductId and mockProductData
    component.updateProduct(mockProductId, mockProductData);

    expect(crudProductService.updateProduct).toHaveBeenCalledWith(mockProductId, mockProductData);
    expect(component.crudProducts[0]).toEqual(updatedProduct); // Check if the product was updated
    expect(component.p).toEqual(new CrudProduct()); // Assuming you want to reset `this.p`
  });

  it('should handle error during product update', () => {
    const mockProductId = 1;
    const mockProductData = {
      id: mockProductId,
      productName: 'OnePlus',
      productDesc: 'Phone',
      price: 29999,
      features: 'Good',
      quantity: 20,
      imageUrl: 'abcder',
      productStatus: 'OUT OF STOCK'
    };

    // Mock the service to return an observable that throws an error
    crudProductService.updateProduct.and.returnValue(throwError('Update failed'));

    spyOn(console, 'log'); // Spy on console.log to check error logging

    component.updateProduct(mockProductId, mockProductData);

    expect(crudProductService.updateProduct).toHaveBeenCalledWith(mockProductId, mockProductData);
    expect(console.log).toHaveBeenCalledWith('Error caught', 'Update failed'); // Check if error is logged
  });

   // logout

   it('should log out successfully', () => {
    spyOn(localStorage, 'clear'); // Spy on localStorage.clear
    spyOn(window, 'alert'); // Spy on window.alert

    component.logout(); // Call the logout method

    expect(localStorage.clear).toHaveBeenCalled(); // Check if localStorage was cleared
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login'); // Check navigation to login
    expect(window.alert).toHaveBeenCalledWith('You have been logged out successfully'); // Check alert
  });
});

