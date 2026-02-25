import { CurrentWeather } from '../weather/current-weather';

export class MessageMarkupHelper {
  static formatCurrentWeather(currentWeather: CurrentWeather): string {
    return `Currently: ${currentWeather.temperature}&#8451;%0AHumidity: ${currentWeather.humidity}% %0AWind speed: ${currentWeather.windSpeed} m/s %0ARain: ${currentWeather.rain}%`;
  }
}
