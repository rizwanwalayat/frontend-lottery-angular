import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  baseUrl = environment.baseUrl;
  walletUrl:string = this.baseUrl+'/wallet';

  constructor(private http:HttpClient, private jwtModule: JwtModule) {}

  getWallet():Observable<any>{
    return this.http.get<any>(this.walletUrl);
  }

  payWithWallet(cart): Observable<any>{
    return this.http.post<any>(this.walletUrl, cart, httpOptions);
  }
}
