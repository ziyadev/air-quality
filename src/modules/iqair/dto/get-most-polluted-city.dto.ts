import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class GetMostPollutedDto {
  @ApiProperty({
    example: 'paris',
    required: true,
    description: 'City name',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['paris'])
  city: string;
}

export class GetMostPollutedResponseDto {
  @Expose()
  city: string;

  @Expose()
  aqius: number;

  @Expose()
  mainus: string;

  @Expose()
  aqicn: number;

  @Expose()
  maincn: string;

  @Expose()
  timestamp: Date;
}
