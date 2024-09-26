import { Component } from '@angular/core';
import { CrudProduct } from './crud-product';
import { CrudProductService } from './crud-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-product',
  templateUrl: './crud-product.component.html',
  styleUrl: './crud-product.component.css',
})
export class CrudProductComponent {
  constructor(
    private crudProductService: CrudProductService,
    private router: Router
  ) {}
  message: string = '';
  data: any = {};
  p: CrudProduct = new CrudProduct();
  up: CrudProduct = new CrudProduct();
  crudProducts: Array<CrudProduct> = [];

  updateProductId: number | null = null;

  setUpdateProductId(data: any) {
    this.up = data;
  }

  deleteProductId: number | null = null;

  setDeleteProductId(id: number) {
    this.deleteProductId = id;
  }
  ngOnInit(): void {
    this.crudProductService.getAllProducts().subscribe(
      (data) => {
        this.crudProducts = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addProduct() {
    this.crudProductService.addProduct(this.p).subscribe(
      (data) => {
        if (this.crudProducts) {
          this.crudProducts.push(data);
        } else {
          this.crudProducts = [data];
        }
        alert('Product added successfully');
      },
      (error) => {
        console.log(error);
        alert('Failed to add product. Please try again.');
      }
    );
    this.p = new CrudProduct();
  }

  deleteProduct(id: number | null) {
    if (id !== null) {
      this.crudProductService.deleteProduct(id).subscribe({
        next: (data: any) => {
          this.crudProducts = this.crudProducts.filter(
            (product) => product.id !== id
          );
          this.data = data;
          this.message = 'Product deleted successfully';
        },
        error: (err: any) => {
          console.log('Error caught', err);
          this.message = 'Product deleted failed';
        },
      });
      // Reset the deleteProductId after deletion
      this.deleteProductId = null;
    }
  }

  updateProduct(id: number | null, data: any) {
    // console.log('started', id, data);
    this.crudProductService.updateProduct(id, data).subscribe({
      next: (data: any) => {
        const index = this.crudProducts.findIndex(
          (product) => product.id === id
        );

        if (index !== -1) {
          this.crudProducts[index] = data;
        }
        alert('product updated successfully');
      },
      error: (err: any) => console.log('Error caught', err),
    });
    this.p = new CrudProduct();
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    alert('You have been logged out successfully');
  }
}
