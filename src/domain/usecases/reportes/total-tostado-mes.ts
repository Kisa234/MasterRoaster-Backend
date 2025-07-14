import { PedidoRepository } from "../../repository/pedido.repository";

export interface TotalTostadoUseCase {
    execute(mes:Date): Promise<number>;
}

export class TotalTostado implements TotalTostadoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
    ){}

    async execute(mes:Date): Promise<number> {
        const pedidos = await this.pedidoRepository.getPedidosOrdenTueste();

        const pedidosFiltrados = pedidos.filter(pedido => {
            const fechaPedido = new Date(pedido.fecha_tueste!);
            return fechaPedido.getMonth() === mes.getMonth() && 
                   fechaPedido.getFullYear() === mes.getFullYear();
        });

        const totalTostado = pedidosFiltrados.reduce((total, pedido) => {
            return total + (pedido.cantidad!);
        }, 0);

        return totalTostado;
    }

}