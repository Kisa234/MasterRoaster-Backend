export class UpdatePedidoDto {
  private constructor(
    public readonly id_pedido?: string,
    public readonly tipo_pedido?: string,
    public readonly cantidad?: number,
    public readonly estado_pedido?: string,
    public readonly comentario?: string,
    public readonly id_user?: string,
    public readonly id_lote?: string,
    public readonly id_nuevoLote?: string,
    public readonly id_nuevoLote_tostado?: string,
    public readonly pesos?: number[],
    public readonly tostadora?: string,
    public readonly fecha_tueste?: Date,
    public readonly molienda?: string,
    public readonly gramaje?: number,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.tipo_pedido) returnObj.tipo_pedido = this.tipo_pedido;
    if (this.cantidad) returnObj.cantidad = this.cantidad;
    if (this.estado_pedido) returnObj.estado_pedido = this.estado_pedido;
    if (this.comentario) returnObj.comentario = this.comentario;
    if (this.id_nuevoLote) returnObj.id_nuevoLote = this.id_nuevoLote;
    if (this.id_nuevoLote_tostado) returnObj.id_nuevoLote_tostado = this.id_nuevoLote_tostado;
    if (this.pesos) returnObj.pesos = this.pesos;
    if (this.tostadora) returnObj.tostadora = this.tostadora;
    if (this.fecha_tueste) returnObj.fecha_tueste = this.fecha_tueste;
    if (this.molienda) returnObj.molienda = this.molienda;
    if (this.gramaje) returnObj.gramaje = this.gramaje;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdatePedidoDto?] {
    const {
      id_pedido,
      tipo_pedido,
      cantidad,
      estado_pedido,
      comentario,
      id_user,
      id_lote,
      id_nuevoLote,
      id_nuevoLote_tostado,
      pesos,
      tostadora,
      fecha_tueste,
      molienda,
      gramaje,
    } = props;

    const fechaTuesteDate = fecha_tueste ? new Date(fecha_tueste) : undefined;

    return [
      undefined,
      new UpdatePedidoDto(
        id_pedido,
        tipo_pedido,
        cantidad,
        estado_pedido,
        comentario,
        id_user,
        id_lote,
        id_nuevoLote,
        id_nuevoLote_tostado,
        pesos,
        tostadora,
        fechaTuesteDate,
        molienda,
        gramaje,
      ),
    ];
  }
}
