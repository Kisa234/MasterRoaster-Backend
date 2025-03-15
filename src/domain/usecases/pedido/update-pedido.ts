import { UpdatePedidoDto } from "../../dtos/pedido/update";
import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface UpdatePedidoUseCase {
    execute(id: string, updatePedidoDto: UpdatePedidoDto): Promise<PedidoEntity>;
}

export class UpdatePedido implements UpdatePedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(id: string, updatePedidoDto: UpdatePedidoDto): Promise<PedidoEntity> {
        return this.pedidoRepository.updatePedido(id, updatePedidoDto);
    }
}