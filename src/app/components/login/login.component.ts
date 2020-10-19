import { Component, OnInit,  } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  baseUrl = environment.baseUrl;
  googleOAuthUrl = this.baseUrl+'/auth/google';
  facebookOAuthUrl = this.baseUrl+'/auth/facebook';
  user: Object = {};
  username: string = "";
  password: string = "";
  hide:boolean = true;
  public error: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  public onSubmitTemplate(){
    this.auth.login(this.username, this.password)
    .pipe(first())
    .subscribe(
      result => this.router.navigate(['/dashboard']),
      err => this.error = 'Invalid Username or Password'
    )
  }
  // public windowLogin(){
  //   console.log('windowLogin', this.baseUrl)
  //   window.open(this.baseUrl+'/auth/google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    
  //   let listener = window.addEventListener('message', (message) => {
  //     console.log('message', message)    
  //   }); 
  // }



}
