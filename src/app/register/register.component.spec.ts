import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component'; 
import { RegisterService } from './register.service'; 
import { Register } from './register'; 
import { of, throwError } from 'rxjs';
import {FormsModule} from '@angular/forms';;

describe('MyComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService: jasmine.SpyObj<RegisterService>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['registerForm']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    httpMock = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should register successfully', () => {
    const mockResponse = { success: true }; 
    registerService.registerForm.and.returnValue(of(mockResponse)); 

    component.register = new Register(); 
    component.registerFormTemplate();

    expect(registerService.registerForm).toHaveBeenCalledWith(component.register);
    expect(component.message).toBe('Registered Successfully');
    expect(component.register).toEqual(new Register()); 
  });

  it('should handle error on registration', () => {
    const mockError = { error: 'Error message' }; 
    registerService.registerForm.and.returnValue(throwError(mockError)); 

    component.register = new Register(); 
    component.registerFormTemplate();

    expect(registerService.registerForm).toHaveBeenCalledWith(component.register);
    expect(component.message).toBe('Please enter the mandatory fields');
  });
});
