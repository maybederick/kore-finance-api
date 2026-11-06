import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransacoesModule } from './transacoes/transacoes.module';

const mongoUri =
  process.env.MONGODB_URI ||
  'mongodb+srv://SEU_USUARIO:SUA_SENHA@SEU_CLUSTER.mongodb.net/kore_finance?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    TransacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}