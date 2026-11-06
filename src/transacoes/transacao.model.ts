import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const TransacaoSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true,
    trim: true,
  },
  valor: {
    type: Number,
    required: true,
    min: 0,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['receita', 'despesa'],
  },
  categoria: {
    type: String,
    required: true,
    trim: true,
  },
  consumoConsciente: {
    type: Boolean,
    required: true,
  },
});

export interface Transacao extends Document {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  consumoConsciente: boolean;
}