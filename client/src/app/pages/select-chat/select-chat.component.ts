import { Component, ElementRef, OnInit, computed } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/user.service';
import { MessageChat } from '../../models/message-chat';
import { GenerateMessage } from '../../services/chat/generateMessage';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { PublicationService } from '../../services/publication/publication.service';
import { Publication } from '../../models/publication';
import { PostTransaction } from '../../services/transaction/post-transaction';
import { TransactionService } from '../../services/transaction/transaction.service';
import { CoinService } from '../../services/coin/coin.service';
import { Coin } from '../../models/coin';

@Component({
  selector: 'app-select-chat',
  templateUrl: './select-chat.component.html',
  styleUrl: './select-chat.component.css'
})
export class SelectChatComponent implements OnInit {
  user = computed(() => this.loginService.getLoginUser());
  chat = computed(() => this.chatService.getChat());
  coin = computed(() => this.coinService.getCoins());
  other_id = 0;
  other_name = "";
  messagesChat: MessageChat[] = [];
  publication: Publication = {
    id: 0,
    users_id: 0,
    publication_type_id: 0,
    publication_state_id: 0,
    category_id: 0,
    title: "",
    description: "",
    image: "",
    quantity: 0,
    unity_price: 0,
    date: new Date()
  }
  generateMessage: GenerateMessage = {
    chat_id: this.chat().id,
    users_id: this.user().id,
    message: "",
  };
  messageForm = this.formBuilder.group({
    message: ['', Validators.required]
  });
  intervalo$: any;

  constructor(private formBuilder: FormBuilder, private publicationService: PublicationService, private elementRef: ElementRef,
    private chatService: ChatService, private loginService: LoginService, private userService: UserService,
    private transactionService: TransactionService, private coinService: CoinService) {
  }
  ngOnInit(): void {
    this.scrollToBottom();
    if (this.chat().buyer_users_id === this.user().id) {
      this.other_id = this.chat().seller_users_id;
    } else {
      this.other_id = this.chat().buyer_users_id;
    }
    this.getOtherUserName(this.other_id);
    this.getMessageChat(this.chat().id);
    this.getPublication(this.chat().publication_id);
    this.intervalo$ = interval(1000).subscribe(() => {
      this.getMessageChat(this.chat().id);
    });
  }

  getPublication(id: number) {
    this.publicationService.getPublication(id).subscribe(
      (publication: Publication) => {
        this.publication = publication;
      }
    )
  }

  sendMessage() {
    const messageFormControl = this.messageForm.get('message');

    if (messageFormControl && messageFormControl.value !== null && messageFormControl.value !== undefined) {
      this.generateMessage = {
        chat_id: this.chat().id,
        users_id: this.user().id,
        message: messageFormControl.value
      };
    } else {
      this.generateMessage = {
        chat_id: this.chat().id,
        users_id: this.user().id,
        message: ""
      };
    }
    if (this.generateMessage.message == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El mensaje no puede estar vacio!',
        confirmButtonText: 'Entendido'
      })
    } else {
      this.chatService.createMessage(this.generateMessage).subscribe({
        error: (errorData) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un fallo al enviar el mensaje, intenta de nuevo!',
            confirmButtonText: 'Entendido'
          })
          console.error(errorData);
        },
        complete: () => {
          this.getMessageChat(this.chat().id);
          this.messageForm.reset();
        }
      });
    }
  }

  pay(moneda: string, coin: number, type: string) {
    Swal.fire({
      title: 'Llena los campos si quieres hacer un pago a este usuario',
      icon: 'warning',
      html:
        '<input id="quantity" class="swal2-input" placeholder="Precio por unidad">' +
        '<input id="unity_price" class="swal2-input" placeholder="Unidades">',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const popup = Swal.getPopup();
        if (!popup) {
          console.error('No se pudo obtener el popup de SweetAlert');
          return false;
        }
        const quantityInput = popup.querySelector('#quantity') as HTMLInputElement;
        const unityPriceInput = popup.querySelector('#unity_price') as HTMLInputElement;
        if (!quantityInput || !unityPriceInput) {
          Swal.showValidationMessage('Ambas cantidades son requeridas');
          return false;
        }
        const quantity = quantityInput.value;
        const unity_price = unityPriceInput.value;
        if (!quantity.trim() || !unity_price.trim()) {
          Swal.showValidationMessage('Ambas cantidades son requeridas');
          return false;
        }
        return { quantity: quantity, unity_price: unity_price };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const value = result.value.quantity * result.value.unity_price;
        let process: number = 0;
        if (coin == 1) {
          if (value > this.coin().system_coin) {
            process = 1;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No posees suficientes Arcanes para la transaccion, necesitas: ' + value,
              confirmButtonText: 'Entendido'
            })
          }
        } else {
          if (value > this.coin().volunteerism_coin) {
            process = 1;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No posees suficientes Aid para la transaccion, necesitas: ' + value,
              confirmButtonText: 'Entendido'
            })
          }
        }
        if (process == 0) {
          const description: string = "Se realizo transaccion de : " + type + " con " + result.value.quantity + " en unidades de: " +
            this.publication.title + " por la cantidad de: " + value + " pagado con la moneda: " + moneda;
          const postTransaction: PostTransaction = {
            buyer_users_id: this.chat().buyer_users_id,
            seller_users_id: this.chat().seller_users_id,
            publication_id: this.chat().publication_id,
            publication_type_id: this.publication.publication_type_id,
            quantity: result.value.quantity,
            unity_price: result.value.unity_price,
            description: description,
            total: value,
            coin: coin
          }
          this.transactionService.postTransaction(postTransaction).subscribe({
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fallo el pago, intenta de nuevo!',
                confirmButtonText: 'Entendido'
              })
            },
            complete: () => {
              Swal.fire({
                icon: 'success',
                title: 'Pago exitoso',
                text: '¡La cantidad ingresada ha sido enviada al usuario correspondiente!',
                timer: 1500,
                showConfirmButton: false
              });
              this.getCoin(this.user().id);
            }
          });
        }
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

  scrollToBottom(): void {
    try {
      this.elementRef.nativeElement.querySelector('.chat-container').scrollIntoView({ behavior: 'smooth', block: 'end' });
    } catch (err) { }
  }

  getOtherUserName(id: number) {
    this.userService.getUserName(id).subscribe(
      (user: string) => {
        this.other_name = user;
      }
    )
  }

  getMessageChat(chat: number) {
    this.chatService.getMessageChat(chat).subscribe(
      (messageChat: MessageChat[]) => {
        this.messagesChat = messageChat;
      }
    )
  }

  get message() {
    return this.messageForm.controls.message;
  }
}
