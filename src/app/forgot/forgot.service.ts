import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotService {
  constructor(private http: HttpClient) {}

  public dbUrl = 'http://localhost:8081/api/v1.0/shopping/';

  getToken(email: string | any): Observable<any> {
    return this.http.get(`${this.dbUrl}forgot/${email}`, {
      responseType: 'text',
    });
  }
}
