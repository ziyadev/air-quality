import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './modules/env/env.module';
import { IqairModule } from 'modules/iqair/iqair.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [EnvModule, IqairModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
