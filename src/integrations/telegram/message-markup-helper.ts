import { CurrentWeather } from '../weather/current-weather';

export class MessageMarkupHelper {
  static formatCurrentWeather(currentWeather: CurrentWeather): string {
    return `Currently: ${currentWeather.temperature}&#8451;\\nHumidity: ${currentWeather.humidity}%\\nWind speed: ${currentWeather.windSpeed} m/s\\nRain: ${currentWeather.rain}%`;
  }
}
