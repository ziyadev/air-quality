import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IqairService } from './iqair.service';

@Injectable()
export class AirQualityCronService {
  constructor(private readonly aqairService: IqairService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleAirQualityCheck() {
    const latitude = 48.856613;
    const longitude = 2.352222;
    console.log('Running Air Quality Check for Paris...');
    await this.aqairService.fetchAndSaveAirQuality(latitude, longitude);
  }
}
