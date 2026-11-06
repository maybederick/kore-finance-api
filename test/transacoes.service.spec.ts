import { TransacoesService } from '../src/transacoes/transacoes.service';

describe('TransacoesService - métricas financeiras', () => {
  let service: TransacoesService;

  beforeEach(() => {
    service = new TransacoesService(null as any);
  });

  it('deve calcular saldo, despesas e gastos por impulso', () => {
    const historico = [
      {
        descricao: 'Salário',
        valor: 3000,
        tipo: 'receita' as const,
        categoria: 'Renda',
        consumoConsciente: true,
      },
      {
        descricao: 'Conta de Luz',
        valor: 200,
        tipo: 'despesa' as const,
        categoria: 'Moradia',
        consumoConsciente: true,
      },
      {
        descricao: 'Compra não planejada',
        valor: 350,
        tipo: 'despesa' as const,
        categoria: 'Lazer',
        consumoConsciente: false,
      },
    ];

    const resultado = service.calcularMetricas(historico);

    expect(resultado).toEqual({
      saldoTotal: 2450,
      totalDespesas: 550,
      totalGastoImpulso: 350,
    });
  });
});