import { Component, OnInit, computed } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { CoinService } from '../../services/coin/coin.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActionArcane } from '../../services/coin/action-arcane';
import { Coin } from '../../models/coin';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.css'
})
export class CoinComponent implements OnInit {
  coin = computed(() => this.coinService.getCoins());
  user = computed(() => this.loginService.getLoginUser());
  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private coinService: CoinService) {
  }

  cardForm = this.formBuilder.group({
    number: ['', [Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)]],
    expiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    code: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/)]],
    users_id: [this.user().id],
    quantity: [1, Validators.required]
  })

  ngOnInit(): void {
  }

  buyArcane() {
    if (this.cardForm.valid) {
      this.coinService.buyArcaneCoin(this.cardForm.value as ActionArcane).subscribe({
        next: (coin: Coin) => {
          this.coinService.setCoin(coin);
        },
        error: (errorData) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un fallo al comprar los Arcanes, intenta de nuevo!',
            confirmButtonText: 'Entendido'
          })
          console.error(errorData);
        },
        complete: () => {
          Swal.fire({
            icon: 'success',
            title: 'Compra exitosa',
            text: '¡Has adquirido exitosamente tus Arcanes!',
            timer: 1500,
            showConfirmButton: false
          });
          this.cardForm.reset();
          this.cardForm.patchValue({
            users_id: this.user().id,
            quantity: 1
          });
        }
      })
    }
    else {
      this.cardForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al ingresar los datos! Por favor sigue el formato valido y llena todas las casillas',
        confirmButtonText: 'Entendido'
      })
    }
  }

  withDrawArcane() {
    if (this.cardForm.valid) {
      this.coinService.withDrawArcaneCoin(this.cardForm.value as ActionArcane).subscribe({
        next: (coin: Coin) => {
          this.coinService.setCoin(coin);
        },
        error: (errorData) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un fallo al retirar los Arcanes, verifica que tengas la cantidad indicada!',
            confirmButtonText: 'Entendido'
          })
          console.error(errorData);
        },
        complete: () => {
          Swal.fire({
            icon: 'success',
            title: 'Retiro exitoso',
            text: '¡Has retirado exitosamente tus Arcanes!',
            timer: 1500,
            showConfirmButton: false
          });
          this.cardForm.reset();
          this.cardForm.patchValue({
            users_id: this.user().id,
            quantity: 1
          });
        }
      })
    }
    else {
      this.cardForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al ingresar los datos! Por favor sigue el formato valido y llena todas las casillas',
        confirmButtonText: 'Entendido'
      })
    }
  }

  get number() {
    return this.cardForm.controls.number;
  }

  get expiration() {
    return this.cardForm.controls.expiration;
  }

  get code() {
    return this.cardForm.controls.code;
  }

  get name() {
    return this.cardForm.controls.name;
  }

  get quantity() {
    return this.cardForm.controls.quantity;
  }
}