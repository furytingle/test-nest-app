import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TelegramService {
  constructor(@Inject() private readonly httpService: HttpService) {}

  async sendMessage(chatId: string, text: string): Promise<void> {
    const url = this.getTelegramUrl('sendMessage');

    try {
      await firstValueFrom(
        this.httpService.post(url, {
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to send message', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  }

  private getTelegramUrl(method: string) {
    return `https://api.telegram.org/bot${process.env.TELEGRAM_API_KEY}/${method}`;
  }
}
