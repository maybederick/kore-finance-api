import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(3000);
  console.log('KORE Finance API executando em http://localhost:3000');
}
bootstrap();