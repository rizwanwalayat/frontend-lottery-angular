import { Component, OnInit } from '@angular/core';
import { StripePaymentComponent } from '../stripe-payment/stripe-payment.component';
import {MatDialog} from '@angular/material/dialog';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
constructor(private dialog: MatDialog, private stripeService: StripeService){}

  getTotal(){
    return 1000;
  }
  createOrder(stripeToken){
    console.log('stripeToken', stripeToken)
    const payload = {
      stripeToken,
      totalAmount: this.getTotal()
    }
    this.stripeService.completePayment(payload).subscribe(res => {console.log(res)})
    
  }
  checkout() {
    const dialogRef = this.dialog.open(StripePaymentComponent, {
        width: '50vw',
        // opening dialog here which will give us back stripeToken
        data: {totalAmount: this.getTotal()},
    },);
  dialogRef.afterClosed()
        // waiting for stripe token that will be given back
        .subscribe((result: any) => {
            if (result) {
                this.createOrder(result.token.id);
            }
        });
  }

}

