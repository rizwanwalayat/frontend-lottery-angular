import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms'
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  SignupForm: FormGroup;
  genders: string[] = ['Male', 'Female'];
  hide:boolean = true;
  error:string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.SignupForm = this.formBuilder.group({
      fullName: new FormControl("", Validators.required),
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]],
      gender: ["", [Validators.required]],
      roleId: ["", [Validators.required]],
      agree: [false, [Validators.requiredTrue]]
    })

    // this.SignupForm.valueChanges.subscribe(console.log)
  }


 get email() {   return this.SignupForm.get('email');  }
 get fullName() {   return this.SignupForm.get('fullName');  }
 get password() {   return this.SignupForm.get('password');  }
 get gender() {   return this.SignupForm.get('gender');  }
 get roleId() {   return this.SignupForm.get('roleId');  }
 get agree() {   return this.SignupForm.get('agree');  }

 async onSubmitReactive(){

  const formValues = this.SignupForm.value;

  await this.authService.signup(this.fullName.value, this.email.value, this.password.value, this.gender.value, this.roleId.value  )
  // .pipe(first())
  .subscribe(
    result => {
      this.openSnackBar();
      this.router.navigate(['/login'])
  },
    
    err => {this.error = err.error.message}
  )

 
  

}
 openSnackBar(){
   this._snackBar.open("Signed Up Successfully", "Close", {duration: 3000})
}


}
