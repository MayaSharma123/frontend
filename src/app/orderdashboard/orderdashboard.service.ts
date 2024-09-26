import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orderdetails } from '../orderdetails/orderdetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderdashboardService {
  order: Orderdetails = new Orderdetails();

  constructor(private http: HttpClient) {}

  public dbUrl = 'http://localhost:8081/api/v1.0/shopping/';

  getAllOrdersByUser(): Observable<Array<Orderdetails>> {
    return this.http.get<Array<Orderdetails>>(this.dbUrl + 'allorders');
  }
}
