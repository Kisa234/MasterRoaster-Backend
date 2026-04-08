export class CreateInventarioLoteTostadoDto {

  private constructor(
    public readonly id_lote_tostado: string,
    public readonly id_almacen: string,
    public readonly cantidad_kg: number,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateInventarioLoteTostadoDto?] {

    const { id_lote_tostado, id_almacen, cantidad_kg } = props;

    if (!id_lote_tostado) return ['id_lote_tostado es requerido', undefined];
    if (!id_almacen) return ['id_almacen es requerido', undefined];

    if (cantidad_kg === undefined || cantidad_kg === null) {
      return ['cantidad_kg es requerida', undefined];
    }

    const nCantidad = typeof cantidad_kg === 'string'
      ? Number(cantidad_kg)
      : cantidad_kg;

    if (typeof nCantidad !== 'number' || isNaN(nCantidad) || nCantidad < 0) {
      return ['cantidad_kg debe ser un número >= 0', undefined];
    }

    return [
      undefined,
      new CreateInventarioLoteTostadoDto(
        String(id_lote_tostado),
        String(id_almacen),
        nCantidad
      )
    ];
  }
}
