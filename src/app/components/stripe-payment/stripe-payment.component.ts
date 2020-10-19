import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

declare var Stripe; 

@Component({
    selector: 'app-stripe-payment',
    templateUrl: './stripe-payment.component.html',
    styleUrls: ['./stripe-payment.component.scss'],
})
export class StripePaymentComponent implements OnDestroy, AfterViewInit {
    @ViewChild('cardInfo') cardInfo: ElementRef;
    @Input('totalAmount')
    _totalAmount: number = 0;
    card: any;
    cardHandler = this.onChange.bind(this);
    cardError: string;
    stripe;
    elements;
    constructor(
        private cd: ChangeDetectorRef,
        // @Inject(MAT_DIALOG_DATA) private data: any,
        // private dialogRef: MatDialogRef<StripePaymentComponent>,
    ) {
      this.stripe = Stripe ('pk_test_51HaGr0HMX2JbIG2JPWoSLBLkeJfe9k0prFhm5k3gv9s6bYF9HiYLBwnI4fOVX3ds6nmVR3F2DSkm39wYZ1eiYcbx00nRBM9Kno')
      this.elements = this.stripe.elements();
      
    }
    ngOnDestroy() {
      if (this.card) {
          // We remove event listener here to keep memory clean
          this.card.removeEventListener('change', this.cardHandler);
          this.card.destroy();
      }
    }
    ngAfterViewInit() {
        this.initiateCardElement();
    }
    async initiateCardElement() {
        // Giving a base style here, but most of the style is in scss file
        const cardStyle = {
            base: {
                
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        };
        this.card = this.elements.create('card', {cardStyle});
        this.card.mount(this.cardInfo.nativeElement);
        this.card.addEventListener('change', this.cardHandler);
    }
    onChange({error}) {
        if (error) {
            this.cardError = error.message;
        } else {
            this.cardError = null;
        }
        this.cd.detectChanges();
    }
    async createStripeToken() {
        const {token, error} = await this.stripe.createToken(this.card);
        if (token) {
            this.onSuccess(token);
        } else {
            this.onError(error);
        }
    }
    onSuccess(token) {
        //this.dialogRef.close({token});
    }
    onError(error) {
        if (error.message) {
            this.cardError = error.message;
        }
    }
}