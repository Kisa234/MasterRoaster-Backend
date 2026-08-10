import { PaqueteEntity } from "../../entities/paquete.entity";
import { PaqueteRepository } from "../../repository/paquete.repository";

export interface GetPaqueteByPedidoOrigenUseCase {
    execute(id_pedido: string): Promise<PaqueteEntity | null>;
}

export class GetPaqueteByPedidoOrigen implements GetPaqueteByPedidoOrigenUseCase {
    constructor(private readonly paqueteRepo: PaqueteRepository) { }

    async execute(id_pedido: string): Promise<PaqueteEntity | null> {
        return this.paqueteRepo.getByPedidoOrigen(id_pedido);
    }
}