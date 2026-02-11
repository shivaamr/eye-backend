//import { ValidationPipe } from '@nestjs/common';
//import { NestFactory } from '@nestjs/core';
//import { AppModule } from './app.module';

//async function bootstrap() {
 // const app = await NestFactory.create(AppModule);
 //   app.enableCors(); // Angular access
 // app.useGlobalPipes(new ValidationPipe());
 // await app.listen(process.env.PORT ?? 3000);
//}
//bootstrap();




import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(); // Angular access
  app.useGlobalPipes(new ValidationPipe());

  // 🔑 Serve uploaded images
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
