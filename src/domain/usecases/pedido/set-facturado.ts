import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";
import { UserRepository } from "../../repository/user.repository";

export interface SetPedidoFacturadoUseCase  {
    execute(state:boolean, id_pedido:string): Promise<PedidoEntity>;
}

export class SetPedidoFacturado implements SetPedidoFacturadoUseCase {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(state: boolean, id_pedido: string): Promise<PedidoEntity> {

    const pedido = await this.pedidoRepository.getPedidoById(id_pedido);
    if (!pedido) throw new Error('Pedido no encontrado');

    // Un pedido de tienda nunca se factura — antes se inferia por rol del
    // usuario dueño, ahora se usa el campo explícito owned_by_store.
    if (pedido.owned_by_store) {
      state = false;
    }

    return this.pedidoRepository.setFacturado(state, id_pedido);
  }
}