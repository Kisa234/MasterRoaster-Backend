import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface AsignarPedidoUseCase {
    execute(id_pedido: string, asignado_a_id: string): Promise<PedidoEntity>;
}

export class AsignarPedido implements AsignarPedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(id_pedido: string, asignado_a_id: string): Promise<PedidoEntity> {
        return this.pedidoRepository.asignarPedido(id_pedido, asignado_a_id);
    }
}