import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransacoesModule } from './transacoes/transacoes.module';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error(
    'MONGODB_URI nao definida. Crie o arquivo .env a partir do .env.example e informe a connection string do MongoDB Atlas.',
  );
}

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    TransacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
