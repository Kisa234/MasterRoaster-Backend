import { GetPedidosOrdenTueste } from './../usecases/pedido/get-pedidos-tueste';
import { CreatePedidoDto } from "../dtos/pedido/create";
import { UpdatePedidoDto } from "../dtos/pedido/update";
import { PedidoEntity } from "../entities/pedido.entity";

export abstract class PedidoDatasource {
    abstract createPedido(createPedidoDto:CreatePedidoDto): Promise<PedidoEntity>;
    abstract getPedidoById(id: string): Promise<PedidoEntity | null>;
    abstract updatePedido(id: string, updatePedidoDto:UpdatePedidoDto): Promise<PedidoEntity>;
    abstract deletePedido(id: string): Promise<PedidoEntity>;
    abstract getPedidosByEstado(estado: string): Promise<PedidoEntity[]>;
    abstract getPedidosByCliente(cliente_id: string): Promise<PedidoEntity[]>;
    abstract completarPedido(id_pedido: string): Promise<PedidoEntity>;
    abstract getAllPedidos(): Promise<PedidoEntity[]>;
    abstract getPedidosOrdenTueste(): Promise<PedidoEntity[]>;
    abstract GetPedidosOrdenTuesteByFecha(fecha: Date): Promise<PedidoEntity[]>;
    abstract getPedidosByLote(id_lote: string): Promise<PedidoEntity[]>;
    abstract getLotesCreados(): Promise<string[]>;
    abstract getLotesTostadoCreados(): Promise<string[]>;
}