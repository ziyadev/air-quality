import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsLatitude, IsLongitude } from 'class-validator';
export class GetAirQualityDto {
  @ApiProperty({
    name: 'longitude',
    example: '2.352222',
    required: true,
    description: 'Longitude of the city',
  })
  @IsLongitude()
  lon: number;
  @ApiProperty({
    name: 'latitude',
    example: '48.856613',
    required: true,
    description: 'Latitude of the city',
  })
  @IsLatitude()
  lat: number;
}
class PollutionDto {
  @Expose()
  ts: string;
  @Expose()
  aqius: number;
  @Expose()
  mainus: string;
  @Expose()
  aqicn: number;
  @Expose()
  maincn: string;
}
class ResultDto {
  @Expose()
  @Type(() => PollutionDto)
  pollution: PollutionDto;
}

export class GetAirQualityResponseDto {
  @Expose()
  @Type(() => ResultDto)
  result: ResultDto;
}
