import { TelegramService } from '../../../integrations/telegram/telegram.service';

export class BaseCommandHandler {
  constructor(protected readonly telegramService: TelegramService) {}
}
