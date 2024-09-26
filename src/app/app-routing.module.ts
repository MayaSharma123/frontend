import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CrudProductComponent } from './crud-product/crud-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotComponent } from './forgot/forgot.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ResetComponent } from './reset/reset.component';
import { OrderdashboardComponent } from './orderdashboard/orderdashboard.component';
import { AuthGuard } from './authguard.service';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'admin', component: CrudProductComponent, canActivate: [AuthGuard] },
  {
    path: 'allorders',
    component: OrderdashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderdetailsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
