import { CommandHandlerInterface } from './command-handler.interface';
import { TelegramService } from '../../integrations/telegram/telegram.service';
import { GetCurrentWeatherHandler } from './handlers/get-current-weather-handler';

export class CommandHandlerFactory {
  static createHandler(
    command: string,
    telegramService: TelegramService,
  ): CommandHandlerInterface {
    switch (command) {
      case 'current':
        return new GetCurrentWeatherHandler(telegramService);
      default:
        throw new Error('Unsupported command: ' + command);
    }
  }
}
