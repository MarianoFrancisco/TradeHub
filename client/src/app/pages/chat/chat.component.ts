import { Component, computed } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat/chat.service';
import { UserService } from '../../services/user/user.service';
import { PublicationService } from '../../services/publication/publication.service';
import { Publication } from '../../models/publication';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { PublicationType } from '../../services/publication/publicationType';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  img = environment.urlImg;
  constructor(private loginService: LoginService, private chatService: ChatService,
    private userService: UserService, private publicationService: PublicationService, private router: Router) {
    this.publicationType();
    this.getChats();
  }
  buyers: { [id: number]: string } = {};
  sellers: { [id: number]: string } = {};
  titles: { [id: number]: string } = {};
  images: { [id: number]: string } = {};
  types: { [id: number]: string } = {};
  descriptions: { [id: number]: string } = {};
  publicationTypes: PublicationType[] = []
  chats: Chat[] = [];
  user = computed(() => this.loginService.getLoginUser());

  getChats() {
    this.chatService.getChats(this.user().id).subscribe(
      (chats: Chat[]) => {
        this.chats = chats;
        for (const chat of this.chats) {
          this.getUserBuyerName(chat.buyer_users_id, chat.id);
          this.getUserSellerName(chat.seller_users_id, chat.id);
          this.getPublication(chat.publication_id, chat.id);
        }
      }
    )
  }

  getChatsClient() {
    this.chatService.getChatsClient(this.user().id).subscribe(
      (chats: Chat[]) => {
        this.chats = chats;
        for (const chat of this.chats) {
          this.getUserBuyerName(chat.buyer_users_id, chat.id);
          this.getUserSellerName(chat.seller_users_id, chat.id);
          this.getPublication(chat.publication_id, chat.id);
        }
      }
    )
  }

  getChatsOwner() {
    this.chatService.getChatsOwner(this.user().id).subscribe(
      (chats: Chat[]) => {
        this.chats = chats;
        for (const chat of this.chats) {
          this.getUserBuyerName(chat.buyer_users_id, chat.id);
          this.getUserSellerName(chat.seller_users_id, chat.id);
          this.getPublication(chat.publication_id, chat.id);
        }
      }
    )
  }

  getUserBuyerName(id: number, chat: number) {
    this.userService.getUserName(id).subscribe(
      (user: string) => {
        this.buyers[chat] = user;
      }
    )
  }

  getUserSellerName(id: number, chat: number) {
    this.userService.getUserName(id).subscribe(
      (user: string) => {
        this.sellers[chat] = user;
      }
    )
  }

  getPublication(id: number, chat: number) {
    this.publicationService.getPublication(id).subscribe(
      (publication: Publication) => {
        this.titles[chat] = publication.title;
        this.descriptions[chat] = publication.description;
        this.images[chat] = publication.image;
        this.types[chat] = this.publicationTypes[publication.publication_type_id-1].name;
      }
    )
  }

  publicationType() {
    this.publicationService.getAllPublicationType().subscribe({
      next: (publicationTypes: PublicationType[]) => {
        this.publicationTypes = publicationTypes;
      }
    })
  }

  goToChat(chat: Chat) {
    this.chatService.setChat(chat);
    this.router.navigateByUrl('/view_chat');
  }
}
