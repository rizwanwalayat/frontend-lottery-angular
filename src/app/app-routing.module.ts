import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LotteriesComponent } from './components/lotteries/lotteries.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'todos', component: TodosComponent, canActivate: [AuthGuard]},
  { path: 'lotteries', component: LotteriesComponent, canActivate: [AuthGuard]},
  { path: 'payment_methods', component: PaymentMethodsComponent, canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},

  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login/success/:token', component: LoginSuccessComponent},
  { path: 'signup', component: SignupComponent},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
