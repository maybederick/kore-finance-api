import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao } from './transacao.model';

export interface TransacaoResposta {
  id?: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  consumoConsciente: boolean;
}

export interface MetricasFinanceiras {
  saldoTotal: number;
  totalDespesas: number;
  totalGastoImpulso: number;
}

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel('Transacao')
    private readonly transacaoModel: Model<Transacao>,
  ) {}

  async criarTransacao(transacao: Transacao): Promise<TransacaoResposta> {
    if (!['receita', 'despesa'].includes(transacao.tipo)) {
      throw new BadRequestException(
        'O tipo da transação deve ser "receita" ou "despesa".',
      );
    }

    if (transacao.valor === undefined || transacao.valor < 0) {
      throw new BadRequestException('O valor deve ser maior ou igual a zero.');
    }

    const novaTransacao = new this.transacaoModel({
      descricao: transacao.descricao,
      valor: transacao.valor,
      tipo: transacao.tipo,
      categoria: transacao.categoria,
      consumoConsciente: transacao.consumoConsciente,
    });

    const resultado = await novaTransacao.save();

    return this.mapearTransacao(resultado);
  }

  async listarTransacoes() {
    const transacoes = await this.transacaoModel.find().exec();

    const historico = transacoes.map((transacao) =>
      this.mapearTransacao(transacao),
    );

    const metricas = this.calcularMetricas(historico);

    return {
      historico,
      metricas,
    };
  }

  calcularMetricas(historico: TransacaoResposta[]): MetricasFinanceiras {
    return historico.reduce<MetricasFinanceiras>(
      (metricas, transacao) => {
        if (transacao.tipo === 'receita') {
          metricas.saldoTotal += transacao.valor;
        }

        if (transacao.tipo === 'despesa') {
          metricas.saldoTotal -= transacao.valor;
          metricas.totalDespesas += transacao.valor;

          if (transacao.consumoConsciente === false) {
            metricas.totalGastoImpulso += transacao.valor;
          }
        }

        return metricas;
      },
      {
        saldoTotal: 0,
        totalDespesas: 0,
        totalGastoImpulso: 0,
      },
    );
  }

  private mapearTransacao(transacao: any): TransacaoResposta {
    return {
      id: transacao.id,
      descricao: transacao.descricao,
      valor: transacao.valor,
      tipo: transacao.tipo,
      categoria: transacao.categoria,
      consumoConsciente: transacao.consumoConsciente,
    };
  }
}