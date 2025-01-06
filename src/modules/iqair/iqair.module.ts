import { Module } from '@nestjs/common';
import { IqairService } from './iqair.service';
import { IqairController } from './iqair.controller';
import { HttpModule } from '@nestjs/axios';
import { IQAIR_API_BASE_URL } from './iqair.constants';
import { EnvService } from 'modules/env/env.service';
import { PrismaService } from 'common/services/prisma.service';
import { AirQualityCronService } from './aqair.cron.service';
@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        baseURL: IQAIR_API_BASE_URL,
        params: {
          key: envService.get('IQAIR_API_KEY'), // Automatically include the API key
        },
      }),
    }),
  ],
  controllers: [IqairController],
  providers: [IqairService, PrismaService, AirQualityCronService],
})
export class IqairModule {}
