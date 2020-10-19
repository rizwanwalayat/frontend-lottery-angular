import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  isLoginSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedInObj = false;

  constructor( private http: HttpClient, public jwtHelper: JwtHelperService) { 
  }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem('access_token');
    console.log('isAuthenticated')
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(username: string, password: string):Observable<any>{
    return this.http.post(this.baseUrl+'/auth/login', {username, password})
    .pipe( 
      map(result => {
       this.setLogin(result['token']);
        return true;
    })
    );
  }

  public setLogin(token){
    localStorage.setItem('access_token', token);
    this.isLoginSubject.next(true);
    this.isLoggedInObj = true;
    console.log('isLogin', this.isLoggedIn())
  }

  public signup(name: string, email: string, password: string, gender: string, role: number):Observable<any>{
    return this.http.post(this.baseUrl+'/auth/signup', {name, email, password, gender, role})
    .pipe( 
      map(result => {
        localStorage.setItem('access_token', result['token']);
        return true;
    })
    );
  }

  public logout(){
    localStorage.removeItem('access_token');
    this.isLoggedInObj = false;
    this.isLoginSubject.next(false);
  }

  public isLoggedIn(): Observable<boolean>{
    return this.isLoginSubject.asObservable();
  }

}
