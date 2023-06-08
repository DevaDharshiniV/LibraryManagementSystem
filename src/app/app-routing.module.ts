import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { SingleBookComponent } from './components/single-book/single-book.component';
import { BookReportComponent } from './components/book-report/book-report.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  {path: '' , component:LoginComponent,pathMatch: 'full'},
  // {path: 'home', component:BookDetailsComponent, canActivate:[AuthGuard]},
  // {path: 'single-book/:id' , component:SingleBookComponent, canActivate: [AuthGuard]},
  // {path: 'book-report' , component: BookReportComponent, canActivate: [AuthGuard]},
  {path: 'home', component:BookDetailsComponent},
  {path:'single-book/:id' , component:SingleBookComponent},
  {path: 'book-report' , component: BookReportComponent},
  {path: 'home', component:BookDetailsComponent},
  {path: 'my-account', component: UserDetailsComponent},
  {path:'payment', component:PaymentComponent},
  {path: 'confirmation',component:ConfirmationComponent},

  {path: 'register' , component: RegisterComponent},
  {path: 'login' , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
