import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

console.log(process.env.npm_config_STAGE);
console.log(process.env.STAGE);
console.log(process.env.NODE);

async function bootstrap() {
  // const logger = new Logger('main.ts', { timestamp: true });
  // const app = await NestFactory.create(AppModule);
  // // const configService = app.get(ConfigService);
  // // console.log(configService.get('NODE'));
  // // console.log(configService.get('ENV_VER_1'));
  // // console.log(configService.get('ENV_VER_2'));
  // // console.log(configService.get('ENV_VER_3'));
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new TransformInterceptor());
  // const port = 3000;
  // await app.listen(port);
  // logger.log(port);
}
bootstrap();
