import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CrudProductComponent } from './crud-product/crud-product.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotComponent } from './forgot/forgot.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ResetComponent } from './reset/reset.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrderdashboardComponent } from './orderdashboard/orderdashboard.component';
import { AuthGuard } from './authguard.service';
import { NgxSearchFilterModule } from 'ngx-search-filter';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    CrudProductComponent,
    PageNotFoundComponent,
    ForgotComponent,
    OrderdetailsComponent,
    ResetComponent,
    HeaderComponent,
    FooterComponent,
    OrderdashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSearchFilterModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
