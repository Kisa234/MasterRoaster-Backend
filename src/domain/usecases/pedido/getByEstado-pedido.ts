import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { UserRepository } from "../../repository/user.repository";

export interface GetPedidosByEstadoUseCase {
    execute(estado: string): Promise<PedidoEntity[]>;
}

export class GetPedidosByEstado implements GetPedidosByEstadoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
    ) { }

    async execute(estado: string): Promise<any[]> {
        const pedidos = await this.pedidoRepository.getPedidosByEstado(estado);

        return Promise.all(
            pedidos.map(async (pedido) => {
                let estadoFacturacion: 'ES_NUESTRO' | 'FACTURADO' | 'NO_FACTURADO';

                if (pedido.id_lote) {
                    const lote = await this.loteRepository.getLoteById(pedido.id_lote);
                    if (lote?.id_user) {
                        const user = await this.userRepository.getUserById(lote.id_user);
                        if (user?.rol === 'admin') {
                            estadoFacturacion = 'ES_NUESTRO';
                            return { ...pedido, estadoFacturacion };
                        }
                    }
                }

                estadoFacturacion = pedido.facturado ? 'FACTURADO' : 'NO_FACTURADO';
                return { ...pedido, estadoFacturacion };
            })
        );
    }

}
