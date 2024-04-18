import { Component, computed } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { CoinService } from '../../services/coin/coin.service';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.css'
})
export class RecomendationComponent {
  constructor(private loginService: LoginService, private coinService: CoinService) { }
  user = computed(() => this.loginService.getLoginUser());
}
