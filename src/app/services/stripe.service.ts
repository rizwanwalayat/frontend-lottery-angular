import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  baseUrl = environment.baseUrl;
  stripeUrl:string = this.baseUrl+'/stripe';
  constructor(private http:HttpClient, private jwtModule: JwtModule) {}
  
  completePayment(data): Observable<any>{
    return this.http.post<any>(this.stripeUrl, data);
  }

}
