import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudProduct } from './crud-product';

@Injectable({
  providedIn: 'root',
})
export class CrudProductService {
  constructor(private http: HttpClient) {}

  public dbUrl = 'http://localhost:8081/api/v1.0/shopping/';

  addProduct(p: CrudProduct): Observable<CrudProduct> {
    return this.http.post<CrudProduct>(this.dbUrl + 'add', p);
  }

  getAllProducts(): Observable<Array<CrudProduct>> {
    return this.http.get<Array<CrudProduct>>(this.dbUrl + 'all');
  }

  deleteProduct(id: number): Observable<Object> {
    return this.http.delete(`${this.dbUrl}delete/${id}`, {
      responseType: 'text',
    });
  }

  updateProduct(id: any, p: CrudProduct): Observable<CrudProduct> {
    return this.http.put<CrudProduct>(`${this.dbUrl}update/${id}`, p);
  }
}
