import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TelegramService {
  constructor(@Inject() private readonly httpService: HttpService) {}

  async sendMessage(chatId: string, text: string): Promise<void> {
    const url = this.getTelegramUrl('sendMessage');

    await firstValueFrom(this.httpService.post(url, { chat_id: chatId, text }));
  }

  private getTelegramUrl(method: string) {
    return `https://api.telegram.org/bot${process.env.TELEGRAM_API_KEY}/${method}`;
  }
}
