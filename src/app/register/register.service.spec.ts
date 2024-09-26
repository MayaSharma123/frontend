import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';
import { response } from 'express';
import { Register } from './register';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('RegisterService', () => {
  let mockUserData : Register;
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[RegisterService]
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

   afterEach(()=> {
     httpMock.verify();
   });

   it('should register a user',()=>{
      mockUserData =
      {
      id: 1,
      loginId: 'user1',
      firstName: 'Mohit',
      lastName: 'Singh',
      password:'78906',
      confirmPassword: '78906',
      email: 'Mohit@gmail.com',
      roles: 'ROLE_USER',
      resetPasswordToken : 'abcde123',
     contactNumber:8065348765
     };
     const mockResponse = {
       success : true,
       message : 'User Registered Successfully'
     };

     service.registerForm(mockUserData).subscribe((response)=>{
       expect(response.success).toBeTrue();
       expect(response.message).toBe('User Registered Successfully');
     });

     const req = httpMock.expectOne('http://localhost:8081/api/v1.0/shopping/register');
     expect(req.request.method).toBe('POST');
     req.flush(mockResponse);
   });

   it('should handle registration error',() =>{
      mockUserData = {
      id: 1,
      loginId: 'user1',
      firstName: 'Mohit',
      lastName: 'Singh',
      password:'78906',
      confirmPassword: '78906',
      email: 'Mohit@gmail.com',
      roles: 'ROLE_USER',
      resetPasswordToken: '',
     contactNumber:8065348765
     };

     const mockErrorResponse ={
       status : 400,
       statusText : 'Bad Request'
     };

     service.registerForm(mockUserData).subscribe({
       next: () => fail('expected an error, not success'),
       error: (error) =>{
         expect(error.status).toBe(400);
       }
     });

     const req = httpMock.expectOne('http://localhost:8081/api/v1.0/shopping/register');
     expect(req.request.method).toBe('POST');
     req.flush(null, mockErrorResponse);
   });
  });

