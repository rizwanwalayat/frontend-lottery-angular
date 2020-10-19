import { Component, OnInit } from '@angular/core';
import { Lottery } from 'src/app/models/Lottery';
import { LotteriesService } from 'src/app/services/lotteries.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-lotteries',
  templateUrl: './lotteries.component.html',
  styleUrls: ['./lotteries.component.scss']
})
export class LotteriesComponent implements OnInit {
  lotteries: Lottery[];
  lotteryControl = new FormControl("", Validators.required);
  entriesControl = new FormControl("", Validators.required);
  constructor(private lotteriesService: LotteriesService, private checkoutService: CheckoutService, private router:Router) { }

  ngOnInit(): void {
    this.lotteriesService.getLotteries().subscribe(lotteries => {
      this.lotteries = lotteries;
    })
  }

  onLotterySubmit(){
    if(this.lotteryControl.valid && this.entriesControl.valid){
      this.checkoutService.setCart({lotteryId: this.lotteryControl.value, entries: this.entriesControl.value})
      this.router.navigate(['payment_methods']);
    }
  }

}
