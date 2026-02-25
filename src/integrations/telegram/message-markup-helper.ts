import { CurrentWeather } from '../weather/current-weather';

export class MessageMarkupHelper {
  static formatCurrentWeather(currentWeather: CurrentWeather): string {
    return `Currently: ${currentWeather.temperature}&#8451;\nHumidity: ${currentWeather.humidity}% Wind speed: ${currentWeather.windSpeed} m/s Rain: ${currentWeather.rain}%`;
  }
}
