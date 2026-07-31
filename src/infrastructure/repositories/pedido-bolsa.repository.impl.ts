import { PedidoBolsaDataSource } from "../../domain/datasources/pedido-bolsa.datasource";
import { CreatePedidoBolsaDto } from "../../domain/dtos/pedido-bolsa/create";
import { UpdatePedidoBolsaDto } from "../../domain/dtos/pedido-bolsa/update";
import { PedidoBolsaEntity } from "../../domain/entities/pedidoBolsa.entity";
import { PedidoBolsaRepository } from "../../domain/repository/pedido-bolsa.repository";

export class PedidoBolsaRepositoryImpl implements PedidoBolsaRepository {
    constructor(private readonly datasource: PedidoBolsaDataSource) { }

    createPedidoBolsa(dto: CreatePedidoBolsaDto): Promise<PedidoBolsaEntity> {
        return this.datasource.createPedidoBolsa(dto);
    }
    updatePedidoBolsa(id: string, dto: UpdatePedidoBolsaDto): Promise<PedidoBolsaEntity> {
        return this.datasource.updatePedidoBolsa(id, dto);
    }
    deletePedidoBolsa(id: string): Promise<PedidoBolsaEntity> {
        return this.datasource.deletePedidoBolsa(id);
    }
    getByPedido(id_pedido: string): Promise<PedidoBolsaEntity[]> {
        return this.datasource.getByPedido(id_pedido);
    }
    getByGramaje(gramaje: number): Promise<PedidoBolsaEntity[]> {
        return this.datasource.getByGramaje(gramaje);
    }
    getByMolienda(molienda: string): Promise<PedidoBolsaEntity[]> {
        return this.datasource.getByMolienda(molienda);
    }
}
