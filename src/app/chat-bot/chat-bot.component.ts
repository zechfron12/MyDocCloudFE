import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent {
  isChatPopped = false;
  botUrl = 'https://healthcare-bot-c4zqq44z6shre.azurewebsites.net';

  constructor(private domSanitizer: DomSanitizer) {
    this.botUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.botUrl
    ) as string;
  }

  openChat() {
    this.isChatPopped = true;
  }

  closeChat() {
    this.isChatPopped = false;
  }
}
