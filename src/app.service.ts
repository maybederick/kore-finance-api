import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      projeto: 'KORE Finance API',
      descricao: 'API RESTful para Controle Financeiro Pessoal',
      status: 'online',
      endpoints: ['POST /transacoes', 'GET /transacoes'],
    };
  }
}