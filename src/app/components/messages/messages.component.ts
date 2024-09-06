import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgClass],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  readonly #messageService = inject(MessageService);
  readonly message = this.#messageService.message;

  onClose() {
    this.#messageService.clearMessage();
  }
}
