import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import type { GetAirQualityDto } from './dto/get-air-quality.dto';
import { catchError, firstValueFrom } from 'rxjs';
import type { NearestCiryResponse } from './iqair.types';
import type { AxiosError } from 'axios';
import { PrismaService } from 'common/services/prisma.service';

@Injectable()
export class IqairService {
  private readonly logger = new Logger(IqairService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}
  async getAirQuality(args: GetAirQualityDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<NearestCiryResponse>('/nearest_city', {
          params: {
            ...args,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message); // Log error message, not full error object
            throw new InternalServerErrorException('An error happened!');
          }),
        ),
    );
    return data.data;
  }
  async fetchAndSaveAirQuality(lat: number, lon: number) {
    const { city, current } = await this.getAirQuality({
      lat,
      lon,
    });
    try {
      await this.prismaService.airQuality.create({
        data: {
          aqius: current.pollution.aqius,
          mainus: current.pollution.mainus,
          aqicn: current.pollution.aqicn,
          maincn: current.pollution.maincn,
          city,
          latitude: lat,
          longitude: lon,
        },
      });
    } catch (error) {
      this.logger.error("Couldn't save air quality data", error);
      throw new Error("Couldn't save air quality data");
    }
    return current.pollution;
  }
  async getMostPollutedDt(city: string) {
    try {
      const iqair = await this.prismaService.airQuality.findFirst({
        where: {
          city: {
            equals: city,
            mode: 'insensitive',
          },
        },
        orderBy: {
          aqius: 'desc',
        },
      });
      return {
        city: iqair.city,
        aqius: iqair.aqius,
        mainus: iqair.mainus,
        aqicn: iqair.aqicn,
        maincn: iqair.maincn,
        timestamp: iqair.timestamp,
      };
    } catch (error) {
      this.logger.error("Couldn't get most polluted city", error);
      throw new NotFoundException("Couldn't get most polluted city");
    }
  }
}
