import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { TodosComponent } from './components/todos/todos.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { TodoService } from './services/todo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import {MatIconRegistry} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

import { DateAgoPipe } from './pipes/date-ago.pipe';
import { TokenInterceptorService } from './token-interceptor.service';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { StripePaymentComponent } from './components/stripe-payment/stripe-payment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LotteriesComponent } from './components/lotteries/lotteries.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    HeaderComponent,
    AddTodoComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    DateAgoPipe,
    LoginSuccessComponent,
    StripePaymentComponent,
    CheckoutComponent,
    LotteriesComponent,
    DashboardComponent,
    PaymentMethodsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("access_token");
        },
        allowedDomains: ["localhost:3000"],
        disallowedRoutes: ["localhost:3000/auth"],
      },
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [ 
    AuthGuardService,
    AuthService,
    TodoService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private matIconRegistry: MatIconRegistry) {
    

  }
}

//platformBrowserDynamic().bootstrapModule(AppModule);

