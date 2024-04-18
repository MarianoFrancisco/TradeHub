import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Coin } from '../../models/coin';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ActionArcane } from './action-arcane';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  base = environment.baseBackend;
  private coin = signal<Coin>({
    id: 0,
    users_id: 0,
    volunteerism_coin: 0,
    system_coin: 0
  });

  public setCoin(coin: Coin) {
    localStorage.setItem("coin", JSON.stringify(coin));
    this.coin.set(coin);
  }

  public getCoins = computed(() => this.coin());
  constructor(private http: HttpClient) {
    const coinString: string | null = localStorage.getItem("coin");
    if (coinString !== null) {
      const coin: Coin = JSON.parse(coinString);
      this.coin.set(coin);
    }
  }

  getCoin(id: number): Observable<Coin> {
    return this.http.get<Coin>(`${this.base}coin/${id}`);
  }

  buyArcaneCoin(action_arcane: ActionArcane): Observable<Coin> {
    return this.http.patch<Coin>(`${this.base}coin/buy`, action_arcane);
  }

  withDrawArcaneCoin(action_arcane: ActionArcane): Observable<Coin> {
    return this.http.patch<Coin>(`${this.base}coin/with_draw`, action_arcane);
  }
}
