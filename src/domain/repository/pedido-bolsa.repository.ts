import { CreatePedidoBolsaDto } from "../dtos/pedido-bolsa/create";
import { UpdatePedidoBolsaDto } from "../dtos/pedido-bolsa/update";
import { PedidoBolsaEntity } from "../entities/pedidoBolsa.entity";

export abstract class PedidoBolsaRepository {
    abstract createPedidoBolsa(dto: CreatePedidoBolsaDto): Promise<PedidoBolsaEntity>;
    abstract updatePedidoBolsa(id: string, dto: UpdatePedidoBolsaDto): Promise<PedidoBolsaEntity>;
    abstract deletePedidoBolsa(id: string): Promise<PedidoBolsaEntity>;
    abstract getByPedido(id_pedido: string): Promise<PedidoBolsaEntity[]>;
    abstract getByGramaje(gramaje: number): Promise<PedidoBolsaEntity[]>;
    abstract getByMolienda(molienda: string): Promise<PedidoBolsaEntity[]>;
}
