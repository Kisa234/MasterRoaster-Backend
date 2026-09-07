import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosOwnedByStoreUseCase {
    execute(incluirEliminados?: boolean): Promise<PedidoEntity[]>;
}

export class GetPedidosOwnedByStore implements GetPedidosOwnedByStoreUseCase {
    constructor(private readonly pedidoRepository: PedidoRepository) { }

    execute(incluirEliminados: boolean = false): Promise<PedidoEntity[]> {
        return this.pedidoRepository.getPedidosOwnedByStore(incluirEliminados);
    }
}