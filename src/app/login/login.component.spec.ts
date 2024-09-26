import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to admin page', () => {
    component.loginObj = { loginId: 'admin', password: 'admin123' };

    component.onLogin();

    const req = httpTestingController.expectOne(
      'http://localhost:8081/api/v1.0/shopping/login'
    );
    expect(req.request.method).toEqual('POST');
    req.flush({ token: 'fake-token', role: 'ROLE_ADMIN' });

    expect(localStorage.getItem('loginId')).toEqual('admin');
    expect(localStorage.getItem('loginToken')).toEqual('fake-token');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });

  it('should login successfully and navigate to product page', () => {
    component.loginObj = { loginId: 'user', password: 'user123' };

    component.onLogin();

    const req = httpTestingController.expectOne(
      'http://localhost:8081/api/v1.0/shopping/login'
    );
    expect(req.request.method).toEqual('POST');
    req.flush({ token: 'fake-token', role: 'ROLE_USER' });

    expect(localStorage.getItem('loginId')).toEqual('user');
    expect(localStorage.getItem('loginToken')).toEqual('fake-token');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product');
  });

  it('should handle login failure', () => {
    spyOn(window, 'alert');
    component.loginObj = { loginId: 'invalid', password: 'invalid' };

    component.onLogin();

    const req = httpTestingController.expectOne(
      'http://localhost:8081/api/v1.0/shopping/login'
    );
    expect(req.request.method).toEqual('POST');
    req.flush('Login failed', { status: 401, statusText: 'Unauthorized' });

    expect(window.alert).toHaveBeenCalledWith(
      'Login failed: Incorrect username or password'
    );
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
