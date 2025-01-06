import { Controller, Get, Query } from '@nestjs/common';
import { IqairService } from './iqair.service';
import {
  GetAirQualityDto,
  GetAirQualityResponseDto,
} from './dto/get-air-quality.dto';
import { Serialize } from 'common/decorators/serialize.decorator';
import {
  GetMostPollutedDto,
  GetMostPollutedResponseDto,
} from './dto/get-most-polluted-city.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('iqair')
export class IqairController {
  constructor(private readonly iqairService: IqairService) {}

  @ApiResponse({
    status: 200,
    description: 'Air quality data',
  })
  @Serialize(GetAirQualityResponseDto)
  @Get()
  async airQuality(
    @Query() args: GetAirQualityDto,
  ): Promise<GetAirQualityResponseDto> {
    return {
      result: (await this.iqairService.getAirQuality(args)).current,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'Most polluted timestamp',
  })
  @Serialize(GetMostPollutedResponseDto)
  @Get('most-polluted')
  async mostPollutedCity(
    @Query() args: GetMostPollutedDto,
  ): Promise<GetMostPollutedResponseDto> {
    return await this.iqairService.getMostPollutedDt(args.city);
  }
}
