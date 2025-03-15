import { CreatePedidoDto } from "../../dtos/pedido/create";
import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface CreatePedidoUseCase {
    execute(createPedidoDto: CreatePedidoDto): Promise<PedidoEntity>;
}

export class CreatePedido implements CreatePedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(createPedidoDto: CreatePedidoDto): Promise<PedidoEntity> {
        return this.pedidoRepository.createPedido(createPedidoDto);
    }
}

