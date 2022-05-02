import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as timeout from 'connect-timeout';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(timeout('10m'));
  await app.listen(3000);
}
bootstrap();
