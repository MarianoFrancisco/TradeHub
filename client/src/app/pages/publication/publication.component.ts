import { Component, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from '../../services/publication/publication.service';
import { Publication } from '../../models/publication';
import { LoginService } from '../../services/auth/login.service';
import Swal from 'sweetalert2';
import { ChatService } from '../../services/chat/chat.service';
import { GenerateChat } from '../../services/chat/generateChat';
import { Chat } from '../../models/chat';
import { environment } from '../../../environments/environment.prod';
import { PostReport } from '../../models/post-report';
import { FormBuilder, Validators } from '@angular/forms';
import { CoinService } from '../../services/coin/coin.service';
import { TransactionService } from '../../services/transaction/transaction.service';
import { PostTransaction } from '../../services/transaction/post-transaction';
import { Coin } from '../../models/coin';

declare function dataPublication(): void;

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  coin = computed(() => this.coinService.getCoins());
  img = environment.urlImg;
  publication = computed(() => this.publicationService.getPublicationView());
  user = computed(() => this.loginService.getLoginUser());
  login = computed(() => this.loginService.getLoginOn());
  category: string = "";
  publicationTypes: string = "";

  publicationForm = this.formBuilder.group({
    quantity: [1, Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private publicationService: PublicationService,
    private loginService: LoginService, private chatService: ChatService, private coinService: CoinService,
    private transactionService: TransactionService) { }

  ngOnInit() {
    this.getPublication();
    dataPublication();
  }

  get quantity() {
    return this.publicationForm.controls.quantity;
  }

  getPublication() {
    this.getPublicationType(this.publication().publication_type_id);
    this.getCategory(this.publication().category_id);
  }

  getPublicationType(id: number) {
    this.publicationService.getPublicateType(id).subscribe({
      next: (publicationType: string) => {
        this.publicationTypes = publicationType;
      }
    })
  }

  getCategory(id: number) {
    this.publicationService.getCategory(id).subscribe(
      (category: string) => {
        this.category = category;
      }
    )
  }

  saveTemporaryChat(chat: Chat) {
    this.chatService.setChat(chat);
  }

  buy() {
    if (this.publicationForm.valid) {
      const quantity = this.publicationForm.value.quantity;
      if (quantity != null) {
        if (quantity <= this.publication().quantity) {
          const value = quantity * this.publication().unity_price;
          Swal.fire({
            title: 'Comprando producto',
            text: 'Elige la moneda que quieres utilizar',
            icon: 'info',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Arcane',
            confirmButtonColor: "#00cccc",
            denyButtonText: 'Aid',
            color: '#ff5500',
            denyButtonColor: '#04ff00',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#ff0000'
          }).then((result) => {
            if (result.isConfirmed) {
              if (value <= this.coin().system_coin) {
                this.proccesShop(quantity, value, "Arcane", 1);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No posees suficientes Arcanes para la transaccion, necesitas: ' + value,
                  confirmButtonText: 'Entendido'
                })
              }
            } else if (result.isDenied) {
              if (value <= this.coin().volunteerism_coin) {
                this.proccesShop(quantity, value, "Aid", 2);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No posees suficientes Aid para la transaccion, necesitas: ' + value,
                  confirmButtonText: 'Entendido'
                })
              }
            }
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cantidad ingresada es mayor a la existente',
            confirmButtonText: 'Entendido'
          })
        }
      }
    } else {
      this.publicationForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al ingresar los datos! Ingrese una cantidad mayor a 0',
        confirmButtonText: 'Entendido'
      })
    }
  }

  proccesShop(quantity: number, value: number, moneda: string, coin: number) {
    const description: string = "Se compro: " + quantity + " unidades de: " +
      this.publication().title + " por la cantidad de: " + value + " pagado con la moneda: " + moneda;
    const postTransaction: PostTransaction = {
      buyer_users_id: this.user().id,
      seller_users_id: this.publication().users_id,
      publication_id: this.publication().id,
      publication_type_id: this.publication().publication_type_id,
      quantity: quantity,
      unity_price: this.publication().unity_price,
      description: description,
      total: value,
      coin: coin
    }
    this.transactionService.postTransaction(postTransaction).subscribe({
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Fallo la compra, intenta de nuevo!',
          confirmButtonText: 'Entendido'
        })
      },
      complete: () => {
        Swal.fire({
          icon: 'success',
          title: 'Compra exitosa',
          text: '¡Producto ' + this.publication().title + ' adquirido!',
          timer: 1500,
          showConfirmButton: false
        });
        this.getCoin(this.user().id);
        this.router.navigateByUrl('/');
        this.publicationForm.reset();
      }
    })
  }

  report() {
    Swal.fire({
      title: '¿Quieres enviar reportar esta publicación?',
      text: 'Escribe el motivo del reporte',
      icon: 'warning',
      input: "text",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reportar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const postPublication: PostReport = {
          users_id: this.user().id,
          publication_id: this.publication().id,
          description: result.value,
        };
        this.publicationService.postReport(postPublication).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Publicacion reportada',
              text: '¡La publicacion ha sido reportada!',
              timer: 1500,
              showConfirmButton: false
            })//.then(() => {
            //this.getPublicationUser(this.user().id);
            //});
          },
          error: (errorData) => {
            Swal.fire({
              icon: 'success',
              title: 'Publicacion reportada',
              text: '¡La publicacion ha sido reportada!',
              timer: 1500,
              showConfirmButton: false
            })
            console.error(errorData);
          }
        });
      }
    });
  }

  createChat() {
    const generateChat: GenerateChat = {
      seller: this.publication().users_id,
      buyer: this.user().id,
      publication: this.publication().id
    };
    this.chatService.createChat(generateChat).subscribe({
      next: (response: any) => {
        const chat: Chat = response.chat;
        Swal.fire({
          icon: 'success',
          title: 'Creando y redirigiendo a chat',
          text: '¡Espere un momento, le estamos redirigiendo al chat de la publicacion',
          timer: 1500,
          showConfirmButton: false
        });
        this.chatService.setChat(chat);
        this.router.navigateByUrl('/view_chat');
      },
      error: (errorData) => {
        Swal.fire({
          icon: 'success',
          title: 'Redirigiendo a chat',
          text: '¡Espere un momento, le estamos redirigiendo al chat de la publicacion',
          timer: 1500,
          showConfirmButton: false
        });
        this.chatService.setChat(errorData.error.chat);
        this.router.navigateByUrl('/view_chat');
      }
    });
  }

  getCoin(id: number) {
    this.coinService.getCoin(id).subscribe(
      (coin: Coin) => {
        this.coinService.setCoin(coin);
      }
    )
  }
}
