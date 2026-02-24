import { Inject, Injectable } from '@nestjs/common';
import { TelegramService } from '../../integrations/telegram/telegram.service';

@Injectable()
export class CommandService {
  constructor(@Inject() private readonly telegramService: TelegramService) {}
}
