import { Component, OnInit } from '@angular/core';
import { StripePaymentComponent } from '../stripe-payment/stripe-payment.component'
import { WalletService } from 'src/app/services/wallet.service';
import { CheckoutService } from 'src/app/services/checkout.service';
@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  walletBalance;
  cart;
  constructor(private walletService: WalletService, private checkoutService: CheckoutService) {
    
    this.cart = this.checkoutService.cart;

    this.walletService.getWallet().subscribe(wallet => {
      this.walletBalance = wallet.balance;
    });
    
   }

  ngOnInit(): void {
    
  }

  payWithWallet(){
    this.walletService.payWithWallet(this.cart).subscribe(res => console.log(res))
  }

}
