/*
  IQAirResponse<T> is a generic type that represents the response from the IQAir API.
  parameter T is the type of the data that is expected to be returned.
*/
export interface IQAirResponse<T> {
  status: string;
  data: T;
}
