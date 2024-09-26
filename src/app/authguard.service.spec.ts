import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './authguard.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.removeItem('loginId'); // Clean up after each test
  });

  it('should allow access if logged in', () => {
    localStorage.setItem('loginId', 'testId'); // Mock login

    const canActivate: boolean = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(canActivate).toBeTrue();
  });

  it('should redirect to login if not logged in', () => {
    localStorage.removeItem('loginId'); // Ensure user is not logged in

    const canActivate: boolean = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});