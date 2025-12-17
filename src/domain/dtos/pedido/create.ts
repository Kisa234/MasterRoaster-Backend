import { Molienda } from "@prisma/client";

export class CreatePedidoDto {
  private constructor(
    public readonly tipo_pedido: string,
    public readonly cantidad: number,
    public readonly comentario: string,
    public readonly id_user: string,
    public readonly facturado: boolean,
    public readonly id_lote?: string,
    public readonly id_nuevoLote?: string,
    public readonly id_nuevoLote_tostado?: string,
    public readonly pesos?: number[],
    public readonly tostadora?: string,
    public readonly fecha_tueste?: Date,
    public readonly id_lote_tostado?: string,
    public readonly gramaje?: number,
    public readonly molienda?: Molienda,
    public readonly id_producto?: string,
    public readonly creado_por_id?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreatePedidoDto?] {
    const {
      tipo_pedido,
      cantidad,
      comentario,
      id_user,
      facturado,
      id_lote,
      id_nuevoLote,
      id_nuevoLote_tostado,
      pesos,
      tostadora,
      fecha_tueste,
      id_lote_tostado,
      gramaje,
      molienda,
      id_producto,
      creado_por_id,
    } = props;

    if (!tipo_pedido) return ['El tipo de pedido es requerido', undefined];
    if (!cantidad) return ['La cantidad es requerida', undefined];
    if (!id_user) return ['El ID del usuario es requerido', undefined];

    if (['Venta Verde', 'Tostado Verde', 'Orden Tueste'].includes(tipo_pedido) && !id_lote)
      return ['El ID del lote es requerido para este tipo de pedido', undefined];

    if (tipo_pedido === 'Maquila') {
      if (!id_lote_tostado)
        return ['Debe indicar el lote tostado de origen', undefined];
      if (!gramaje)
        return ['Debe indicar el gramaje por bolsa (ej. 200g)', undefined];
      if (!molienda)
        return ['Debe indicar el tipo de molienda (Molido o En grano)', undefined];
    }

    const fechaTuesteDate = fecha_tueste ? new Date(fecha_tueste) : undefined;


    const dto = new CreatePedidoDto(
      tipo_pedido,
      cantidad,
      comentario,
      id_user,
      facturado,
      id_lote,
      id_nuevoLote,
      id_nuevoLote_tostado,
      pesos,
      tostadora,
      fechaTuesteDate,
      id_lote_tostado,
      gramaje,
      molienda,
      id_producto,
      creado_por_id,
    );

    const filteredDto = Object.fromEntries(
      Object.entries(dto).filter(([_, v]) => v !== undefined)
    ) as CreatePedidoDto;


    return [undefined, filteredDto];
  }
}
