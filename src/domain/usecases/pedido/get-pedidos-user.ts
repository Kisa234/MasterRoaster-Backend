import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosByUserIdUseCase {
    execute(id_user: string, incluirEliminados?: boolean): Promise<PedidoEntity[]>;
}

export class GetPedidosByUserId implements GetPedidosByUserIdUseCase {
    constructor(private readonly pedidoRepository: PedidoRepository) { }

    execute(id_user: string, incluirEliminados: boolean = false): Promise<PedidoEntity[]> {
        return this.pedidoRepository.getPedidosByUserId(id_user, incluirEliminados);
    }
}