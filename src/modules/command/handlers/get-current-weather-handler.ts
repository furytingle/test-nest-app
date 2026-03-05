import { CommandHandlerInterface } from '../command-handler.interface';
import { WeatherService } from '../../../integrations/weather/weather.service';
import { BaseCommandHandler } from './base-command-handler';
import { User } from '../../user/user.entity';
import { MessageMarkupHelper } from '../../../integrations/telegram/message-markup-helper';

export class GetCurrentWeatherHandler
  extends BaseCommandHandler
  implements CommandHandlerInterface
{
  async handle(user: User): Promise<void> {
    if (!user.location) {
      return this.telegramService.sendMessage(
        user.telegramId,
        'Please send your location first',
      );
    }

    const latitude = user.location.coordinates[1];
    const longitude = user.location.coordinates[0];

    const weatherService = new WeatherService();

    try {
      const currentWeather = await weatherService.getCurrentWeather(
        latitude,
        longitude,
      );
      return this.telegramService.sendMessage(
        user.telegramId,
        MessageMarkupHelper.formatCurrentWeather(currentWeather),
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to access weather API', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  }
}
