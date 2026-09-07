import { PedidoRepository } from "../../repository/pedido.repository";
import { UserRepository } from "../../repository/user.repository";

export interface EstadisticasPedidoPorTipo {
  tipo: string;
  total: number;
  completados: number;
  pendientes: number;
  esNuestro: number;
  facturados: number;
  noFacturados: number;
  cantidadTotal: number;
  tiempoPromedioCompletadoHoras: number | null;
}

export interface ClientePedidos {
  id_user: string;
  cantidadPedidos: number;
}

export interface EstadisticasPedidos {
  totalPedidos: number;
  pedidosCompletados: number;
  pedidosPendientes: number;
  pedidosPropios: number;
  pedidosFacturados: number;
  pedidosNoFacturados: number;
  tiempoPromedioCompletadoHoras: number | null;
  promedioPedidosPorDia: number;
  porTipo: EstadisticasPedidoPorTipo[];
  topClientes: ClientePedidos[];
}

export interface GetEstadisticasPedidosUseCase {
  execute(desde: Date, hasta: Date): Promise<EstadisticasPedidos>;
}

export class GetEstadisticasPedidos implements GetEstadisticasPedidosUseCase {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private tiempoPromedioCompletado(pedidos: { fecha_registro: Date; fecha_completado: Date | null }[]): number | null {
    const completados = pedidos.filter(p => p.fecha_completado);
    if (completados.length === 0) return null;

    const totalHoras = completados.reduce((sum, p) => {
      const horas = (p.fecha_completado!.getTime() - p.fecha_registro.getTime()) / (1000 * 60 * 60);
      return sum + horas;
    }, 0);

    return totalHoras / completados.length;
  }

  private statsPorGrupo(pedidos: any[]): Omit<EstadisticasPedidoPorTipo, 'tipo'> {
    // Pedidos "de tienda" — ahora se usa el campo explícito owned_by_store,
    // en vez de inferir por el rol del usuario dueño.
    const esNuestroList = pedidos.filter(p => p.owned_by_store === true);
    const clientePedidos = pedidos.filter(p => p.owned_by_store !== true);

    const completados = pedidos.filter(p => p.estado_pedido === 'Completado');
    const pendientes = pedidos.filter(p => p.estado_pedido !== 'Completado');

    // Facturación solo tiene sentido sobre pedidos de clientes reales
    const facturados = clientePedidos.filter(p => p.facturado === true);
    const noFacturados = clientePedidos.filter(p => !p.facturado);

    const cantidadTotal = pedidos.reduce((sum, p) => sum + (p.cantidad ?? 0), 0);

    return {
      total: pedidos.length,
      completados: completados.length,
      pendientes: pendientes.length,
      esNuestro: esNuestroList.length,
      facturados: facturados.length,
      noFacturados: noFacturados.length,
      cantidadTotal,
      tiempoPromedioCompletadoHoras: this.tiempoPromedioCompletado(pedidos),
    };
  }

  async execute(desde: Date, hasta: Date): Promise<EstadisticasPedidos> {
    const todosPedidos = await this.pedidoRepository.getPedidosByRango(desde, hasta);

    // Excluir Orden Tueste (estadística propia) y Suscripcion (se rediseñará aparte)
    const pedidos = todosPedidos.filter(p =>
      p.tipo_pedido !== 'Orden Tueste' && p.tipo_pedido !== 'Suscripcion'
    );

    // ── General ──
    const general = this.statsPorGrupo(pedidos);

    // Promedio de pedidos/día calculado sobre el rango REAL de datos (ver punto 2)
    const fechaMinDataset = pedidos.length > 0
      ? pedidos.reduce((min, p) => p.fecha_registro < min ? p.fecha_registro : min, pedidos[0].fecha_registro)
      : desde;
    const diasConDatos = Math.max(1, Math.ceil((hasta.getTime() - fechaMinDataset.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    const promedioPedidosPorDia = pedidos.length > 0 ? pedidos.length / diasConDatos : 0;

    // ── Por tipo_pedido ──
    const porTipoMap = new Map<string, typeof pedidos>();
    for (const p of pedidos) {
      const lista = porTipoMap.get(p.tipo_pedido) ?? [];
      lista.push(p);
      porTipoMap.set(p.tipo_pedido, lista);
    }

    const porTipo: EstadisticasPedidoPorTipo[] = [...porTipoMap.entries()].map(([tipo, lista]) => ({
      tipo,
      ...this.statsPorGrupo(lista),
    }));

    // ── Top clientes (excluye pedidos de tienda) ──
    const porCliente = new Map<string, number>();
    for (const p of pedidos) {
      if (p.owned_by_store === true || !p.id_user) continue;
      porCliente.set(p.id_user, (porCliente.get(p.id_user) ?? 0) + 1);
    }
    const topClientes: ClientePedidos[] = [...porCliente.entries()]
      .map(([id_user, cantidadPedidos]) => ({ id_user, cantidadPedidos }))
      .sort((a, b) => b.cantidadPedidos - a.cantidadPedidos)
      .slice(0, 5);

    return {
      totalPedidos: general.total,
      pedidosCompletados: general.completados,
      pedidosPendientes: general.pendientes,
      pedidosPropios: general.esNuestro,
      pedidosFacturados: general.facturados,
      pedidosNoFacturados: general.noFacturados,
      tiempoPromedioCompletadoHoras: general.tiempoPromedioCompletadoHoras,
      promedioPedidosPorDia,
      porTipo,
      topClientes,
    };
  }
}