import { fetchWeatherApi } from 'openmeteo';
import { Injectable } from '@nestjs/common';
import { CurrentWeather } from './current-weather';

@Injectable()
export class WeatherService {
  private static readonly URL = 'https://api.open-meteo.com/v1/forecast';

  async getCurrentWeather(latitude: number, longitude: number) {
    const params = {
      latitude,
      longitude,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'wind_speed_10m',
        'rain',
      ],
    };

    const responses = await fetchWeatherApi(WeatherService.URL, params);

    const response = responses[0];

    const lat = response.latitude();
    const long = response.longitude();
    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
      `\nCoordinates: ${lat}°N ${long}°E`,
      `\nElevation: ${elevation}m asl`,
      `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

    const current = response.current()!;

    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature_2m: current.variables(0)!.value(),
        relative_humidity_2m: current.variables(1)!.value(),
        wind_speed_10m: current.variables(2)!.value(),
        rain: current.variables(3)!.value(),
      },
    };

    console.log('\nHourly data:\n', weatherData.current);

    const currentWeather = new CurrentWeather();
    currentWeather.temperature = weatherData.current.temperature_2m.toFixed(1);
    currentWeather.humidity = weatherData.current.relative_humidity_2m;
    currentWeather.windSpeed = weatherData.current.wind_speed_10m.toFixed(1);
    currentWeather.rain = weatherData.current.rain;

    return currentWeather;
  }
}
