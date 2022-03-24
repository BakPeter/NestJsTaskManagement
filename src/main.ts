import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

// console.log(process.env.STAGE_ENV_FILE);
// console.log(process.env.STAGE_JSON_SCRIPT);

async function bootstrap() {
  const logger = new Logger('main.ts', { timestamp: true });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = 3000;
  await app.listen(port);
  logger.debug('listennig on port ' + port);
  logger.debug('==========================================');

  // logger.debug(configService.get('STAGE_ENV_FILE'));
  // logger.debug(process.env.STAGE_ENV_FILE);
  // logger.debug('==========================================');
  logger.debug(configService.get('STAGE'));
  // logger.debug(process.env.STAGE);
  logger.debug('==========================================');
}
bootstrap();
