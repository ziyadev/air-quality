import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { SerializeInterceptor } from 'common/interceptors/serialize.interceptor';

export function Serialize<T>(dto: ClassConstructor<T>) {
  return applyDecorators(UseInterceptors(new SerializeInterceptor<T>(dto)));
}
