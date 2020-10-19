import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-success',
  template: '',
  styles: ['']
})
export class LoginSuccessComponent implements OnInit {
  jwt: string;
  constructor(private route: ActivatedRoute, private router:Router,private authService: AuthService) { 
    this.jwt = this.route.snapshot.params.token;
    this.authService.setLogin(this.jwt);
    this.router.navigate(['/dashboard'])
    
  }

  ngOnInit(): void {
  }

}
