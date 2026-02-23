import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TelegramService {
  constructor(@Inject() private readonly httpService: HttpService) {}

  public sendMessage(chatId: string, text: string): void {
    const url = this.getTelegramUrl('sendMessage');

    this.httpService.post(url, { chat_id: chatId, text });
  }

  private getTelegramUrl(method: string) {
    return `https://api.telegram.org/bot${process.env.TELEGRAM_API_KEY}/${method}`;
  }
}
