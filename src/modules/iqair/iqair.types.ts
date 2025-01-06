import type { Current } from './interfaces/current.interface';
import type { IQAirResponse } from './interfaces/iqair-response.interface';
import type { Location } from './interfaces/location.interface';

export type NearestCiryResponse = IQAirResponse<{
  city: string;
  country: string;
  state: string;
  location: Location;
  current: Current;
}>;
