import { Component, OnInit, computed } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/user.service';
import { Coin } from '../../models/coin';
declare function dataPublication(): void;

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.css'
})
export class CoinComponent implements OnInit {
  coin: Coin = {
    id: 0,
    users_id: 0,
    volunteerism_coin: 0,
    system_coin: 0
  }
  user = computed(() => this.loginService.getLoginUser());
  constructor(private loginService: LoginService, private userService: UserService) { }
  ngOnInit(): void {
    this.getPublication(this.user().id);
    dataPublication();
  }
  getPublication(id: number) {
    this.userService.getCoin(id).subscribe(
      (coin: Coin) => {
        this.coin = coin;
      }
    )
  }
}