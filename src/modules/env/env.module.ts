import { Global, Module } from '@nestjs/common';

import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '../../env';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
      validate: (config) => envSchema.parse(config),
    }),
  ],
  exports: [EnvService],
  providers: [EnvService],
})
export class EnvModule {}
