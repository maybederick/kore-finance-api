import { Body, Controller, Get, Post } from '@nestjs/common';
import { Transacao } from './transacao.model';
import { TransacoesService } from './transacoes.service';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  // CREATE - cadastra uma nova receita ou despesa.
  @Post()
  async criarTransacao(@Body() transacao: Transacao): Promise<any> {
    const novaTransacao = await this.transacoesService.criarTransacao(transacao);

    return {
      mensagem: 'Transação cadastrada com sucesso.',
      transacao: novaTransacao,
    };
  }

  // READ - retorna histórico e métricas processadas no back-end.
  @Get()
  listarTransacoes(): Promise<any> {
    return this.transacoesService.listarTransacoes();
  }
}