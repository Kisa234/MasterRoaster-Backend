import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosOrdenTuesteByFechaUseCase {
    execute(fecha:Date): Promise<PedidoEntity[]>;
}

export class GetPedidosOrdenTuesteByFecha implements GetPedidosOrdenTuesteByFechaUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(fecha:Date): Promise<PedidoEntity[]> {
        return this.pedidoRepository.GetPedidosOrdenTuesteByFecha(fecha);
    }
}