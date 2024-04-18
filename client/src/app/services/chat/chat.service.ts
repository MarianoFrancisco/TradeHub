import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { GenerateChat } from './generateChat';
import { Chat } from '../../models/chat';
import { MessageChat } from '../../models/message-chat';
import { GenerateMessage } from './generateMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  private chat = signal<Chat>({ id: 0, buyer_users_id: 0, seller_users_id: 0, publication_id: 0 });
  public setChat(chat: Chat) {
    localStorage.setItem("chat", JSON.stringify(chat));
    this.chat.set(chat);
  }
  public getChat = computed(() => this.chat());
  constructor(private http: HttpClient) { 
    const chatString: string | null = localStorage.getItem("chat");
    if (chatString !== null) {
      const chat: Chat = JSON.parse(chatString);
      this.chat.set(chat);
    }
  }
  base = environment.baseBackend;

  createChat(data: GenerateChat): Observable<Chat> {
    return this.http.post<Chat>(`${this.base}chat`, data);
  }

  getChats(id: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.base}chat/user/${id}`);
  }

  getChatsClient(id: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.base}chat/user/client/${id}`);
  }

  getChatsOwner(id: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.base}chat/user/owner/${id}`);
  }

  getMessageChat(id: number): Observable<MessageChat[]> {
    return this.http.get<MessageChat[]>(`${this.base}message_chat/${id}`);
  }

  createMessage(data: GenerateMessage): Observable<MessageChat> {
    return this.http.post<MessageChat>(`${this.base}message_chat`, data);
  }
}
