import { TestBed } from '@angular/core/testing';
import { CrudProductService } from './crud-product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrudProduct } from './crud-product'; 

describe('ProductService', () => {
  let service: CrudProductService;
   let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudProductService]
    });
    service = TestBed.inject(CrudProductService);
    httpMock = TestBed.inject(HttpTestingController);
   });

   afterEach(() => {
    httpMock.verify();
  });
 
  
// Adding Product
  it('should add a product to productlist',()=>{
  const mockUserData =
    {
      id: 1,
      productName: 'OnePlus',
      productDesc: 'Earbuds',
      price: 2999,
      features:'Good',
      quantity:20,
      imageUrl: 'abcder',
      productStatus: 'In Stock',
    };

   service.addProduct(mockUserData).subscribe(product => {
    expect(product).toEqual(mockUserData);;

 });
 const req = httpMock.expectOne(service.dbUrl + 'add');
 expect(req.request.method).toBe('POST');
 req.flush(mockUserData); 
   });

   // GETTING ALL PRODUCT
   it('should retrieve all products', () => {
    const mockProducts =[
    {
      id: 1,
      productName: 'OnePlus',
      productDesc: 'Earbuds',
      price: 2999,
      features:'Good',
      quantity:20,
      imageUrl: 'abcder',
      productStatus: 'In Stock',
    },

    {
      id: 2,
      productName: 'Motorola',
      productDesc: 'phone',
      price: 40000,
      features:'Good',
      quantity: 1,
      imageUrl: 'ajhdgd',
      productStatus: 'In Stock',
    },

  ]
    service.getAllProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(service.dbUrl + 'all');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); 
  });

  //DELETE PRODUCT
  it('should delete a product by id', () => {
    const productId = 1; 

    service.deleteProduct(productId).subscribe(response => {
      expect(response).toBe('Product deleted successfully');
    });

    const req = httpMock.expectOne(`${service.dbUrl}delete/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Product deleted successfully'); 
  });

  // UPDATE A PRODUCT
  it('should update a product by id', () => {
    const productId = 1; 
    const mockProduct={
      id: 1,
      productName: 'OnePlus',
      productDesc: 'Earbuds',
      price: 2999,
      features:'Good',
      quantity:20,
      imageUrl: 'abcder',
      productStatus: 'OUT OF STOCK',
    }

    service.updateProduct(productId, mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${service.dbUrl}update/${productId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct); 
  });
});
