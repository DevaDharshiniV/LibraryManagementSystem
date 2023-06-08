import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { ComponentsComponent } from './book-details/components/components.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { SingleBookComponent } from './components/single-book/single-book.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookReportComponent } from './components/book-report/book-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    SingleBookComponent,
    LoginComponent,
    RegisterComponent,
    BookReportComponent,
    NavbarComponent,
    UserDetailsComponent,
    PaymentComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
