import { Molienda } from "@prisma/client";
import { LoteEntity } from "./lote.entity";

export class PedidoEntity {
  constructor(
    public id_pedido: string,
    public fecha_registro: Date,
    public tipo_pedido: string,
    public cantidad: number,
    public estado_pedido: string,
    public id_user: string,
    public eliminado: boolean,
    public facturado?: boolean,
    public id_lote?: string,
    public id_nuevoLote?: string,
    public id_nuevoLote_tostado?: string,
    public id_almacen?: string,
    public comentario?: string,
    public pesos?: number[],
    public fecha_tueste?: Date,
    public tostadora?: string,
    public id_lote_tostado?: string,
    public gramaje?: number,
    public molienda?: Molienda,
    public id_producto?: string,
    public creado_por_id?: string,
    public completado_por_id?: string,
    public fecha_completado?: Date,
    public id_lote_destino?: string | null,
    public usuario_nombre?: string | null,

  ) { }

  static fromObject(obj: { [key: string]: any }): PedidoEntity {
    const {
      id_pedido,
      fecha_registro,
      tipo_pedido,
      cantidad,
      estado_pedido,
      id_user,
      eliminado,
      facturado,
      id_lote,
      id_nuevoLote,
      id_nuevoLote_tostado,
      id_almacen,
      comentario,
      pesos,
      fecha_tueste,
      tostadora,
      id_lote_tostado,
      gramaje,
      molienda,
      id_producto,
      creado_por_id,
      completado_por_id,
      fecha_completado,

      id_lote_destino,
      usuario_nombre
    } = obj;

    // Validaciones esenciales
    if (!tipo_pedido) throw new Error('tipo_pedido is required');
    if (!cantidad) throw new Error('cantidad is required');
    if (!id_user) throw new Error('id_user is required');

    if (fecha_registro && isNaN(new Date(fecha_registro).getTime()))
      throw new Error('fecha_registro is invalid');

    if (fecha_tueste && isNaN(new Date(fecha_tueste).getTime()))
      throw new Error('fecha_tueste is invalid');

    if (fecha_completado && isNaN(new Date(fecha_completado).getTime()))
      throw new Error('fecha_completado is invalid');

    return new PedidoEntity(
      id_pedido,
      fecha_registro,
      tipo_pedido,
      cantidad,
      estado_pedido,
      id_user,
      eliminado,
      facturado,
      id_lote,
      id_nuevoLote,
      id_nuevoLote_tostado,
      id_almacen,
      comentario,
      pesos,
      fecha_tueste,
      tostadora,
      id_lote_tostado,
      gramaje,
      molienda,
      id_producto,
      creado_por_id,
      completado_por_id,
      fecha_completado,
      id_lote_destino,
      usuario_nombre
    );
  }
}



export class PedidoConLoteEntity {
  constructor(
    public id_pedido: string,
    public fecha_registro: Date,
    public tipo_pedido: string,
    public cantidad: number,
    public estado_pedido: string,
    public id_user: string,
    public eliminado: boolean,
    public facturado?: boolean,
    public id_lote?: string,
    public id_nuevoLote?: string,
    public id_nuevoLote_tostado?: string,
    public id_almacen?: string,
    public comentario?: string,
    public pesos?: number[],
    public fecha_tueste?: Date,
    public tostadora?: string,
    public id_lote_tostado?: string,
    public gramaje?: number,
    public molienda?: Molienda,
    public id_producto?: string,
    public creado_por_id?: string,
    public completado_por_id?: string,
    public fecha_completado?: Date,
    public id_lote_destino?: string | null,
    public usuario_nombre?: string | null,

    // extra
    public lote?: LoteEntity | null,
  ) { }

  static fromObject(obj: { [key: string]: any }): PedidoConLoteEntity {
    return new PedidoConLoteEntity(
      obj.id_pedido,
      obj.fecha_registro,
      obj.tipo_pedido,
      obj.cantidad,
      obj.estado_pedido,
      obj.id_user,
      obj.eliminado,
      obj.facturado,
      obj.id_lote,
      obj.id_nuevoLote,
      obj.id_nuevoLote_tostado,
      obj.id_almacen,
      obj.comentario,
      obj.pesos,
      obj.fecha_tueste,
      obj.tostadora,
      obj.id_lote_tostado,
      obj.gramaje,
      obj.molienda,
      obj.id_producto,
      obj.creado_por_id,
      obj.completado_por_id,
      obj.fecha_completado,
      obj.id_lote_destino,

      // aquí se llena con el nombre que venga de Prisma
      obj.usuario_nombre ?? obj.user?.nombre ?? null,

      obj.lote ? LoteEntity.fromObject(obj.lote) : null,
    );
  }
}

