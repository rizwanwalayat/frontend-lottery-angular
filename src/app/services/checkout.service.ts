import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  cart = {};
  constructor() { }

  setCart(cart){
    cart.totalAmount = cart.entries * 1.00
    this.cart = cart;
    console.log('cart',this.cart)
  }
}
