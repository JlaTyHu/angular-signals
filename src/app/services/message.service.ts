import { Injectable, signal } from '@angular/core';
import { Message, MessageSeverity } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly #message = signal<Message | null>(null);
  readonly message = this.#message.asReadonly();

  showMessage(text: string, severity: MessageSeverity) {
    this.#message.set({
      text,
      severity
    });
  }

  clearMessage() {
    this.#message.set(null);
  }
}
