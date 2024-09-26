import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { of, throwError } from 'rxjs';
import {ProductService} from './product.service';
import {Product} from './product';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxFilterPipe } from 'ngx-search-filter';
describe('MyComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAllProducts']);

   await TestBed.configureTestingModule({
     declarations: [ProductComponent, NgxFilterPipe],
     imports : [HttpClientTestingModule],
     schemas : [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: ProductService, useValue: productServiceSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should retrieve products successfully', () => {
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
    productService.getAllProducts.and.returnValue(of(mockProducts));

    component.viewProducts();

    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });
});