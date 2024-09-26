import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reset } from './reset';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  constructor(private http: HttpClient) {}

  public dbUrl = 'http://localhost:8081/api/v1.0/shopping/';

  resetPassword(p: Reset): Observable<any> {
    return this.http.post(this.dbUrl + 'reset_password', p, {
      responseType: 'text',
    });
  }
}
