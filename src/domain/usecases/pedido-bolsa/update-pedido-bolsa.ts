import { UpdatePedidoBolsaDto } from "../../dtos/pedido-bolsa/update";
import { PedidoBolsaEntity } from "../../entities/pedidoBolsa.entity";
import { PedidoBolsaRepository } from "../../repository/pedido-bolsa.repository";

export interface UpdatePedidoBolsaUseCase {
    execute(id: string, dto: UpdatePedidoBolsaDto): Promise<PedidoBolsaEntity>;
}

export class UpdatePedidoBolsa implements UpdatePedidoBolsaUseCase {
    constructor(private readonly repository: PedidoBolsaRepository) { }

    async execute(id: string, dto: UpdatePedidoBolsaDto): Promise<PedidoBolsaEntity> {
        return this.repository.updatePedidoBolsa(id, dto);
    }
}
