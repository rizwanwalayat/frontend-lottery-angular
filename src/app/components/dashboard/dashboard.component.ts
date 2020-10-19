import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  walletBalance = 0;
  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.getWallet().subscribe(wallet => {
      this.walletBalance = wallet.balance;
    });
  }

}
