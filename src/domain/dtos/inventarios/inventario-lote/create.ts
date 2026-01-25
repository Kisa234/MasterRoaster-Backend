export class CreateInventarioLoteDto {

  private constructor(
    public readonly id_lote: string,
    public readonly id_almacen: string,
    public readonly cantidad_kg: number,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateInventarioLoteDto?] {

    const { id_lote, id_almacen, cantidad_kg } = props;

    if (!id_lote) return ['id_lote es requerido', undefined];
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
      new CreateInventarioLoteDto(
        String(id_lote),
        String(id_almacen),
        nCantidad
      )
    ];
  }
}
