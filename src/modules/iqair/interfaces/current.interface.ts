import type { Pollution } from './pollution.interface';
import type { Weather } from './weather.interface';

export interface Current {
  pollution: Pollution;
  weather: Weather;
}
