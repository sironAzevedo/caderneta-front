import { Status } from "./status-conta.model";
import { Mes } from "./mes.model";
import { TipoConta } from "./tipo-conta.model";

export interface Account {
    codigo?: number;
    emailUser?: string;
    valorConta: string;
    dataVencimento: string;
    dataPagamento?: string;
    mes: Mes;
    status: Status;
    qtdParcelas: number;
    comentario: string;
    tipoConta: TipoConta;
}