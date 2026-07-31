import { CreatePedidoBolsaDto } from "../../dtos/pedido-bolsa/create";
import { PedidoBolsaEntity } from "../../entities/pedidoBolsa.entity";
import { PedidoBolsaRepository } from "../../repository/pedido-bolsa.repository";

export interface CreatePedidoBolsaUseCase {
    execute(dto: CreatePedidoBolsaDto): Promise<PedidoBolsaEntity>;
}

export class CreatePedidoBolsa implements CreatePedidoBolsaUseCase {
    constructor(private readonly repository: PedidoBolsaRepository) { }

    async execute(dto: CreatePedidoBolsaDto): Promise<PedidoBolsaEntity> {
        return this.repository.createPedidoBolsa(dto);
    }
}
