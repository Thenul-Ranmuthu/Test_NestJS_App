import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const port = Number(process.env.PORT ?? 3080)
  logger.log(`Application Started on PORT: ${port}`)
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
