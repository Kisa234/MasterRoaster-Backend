export class CreateInventarioInsumoDto {
  private constructor(
    public readonly id_insumo: string,
    public readonly id_almacen: string,
    public readonly cantidad: number,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateInventarioInsumoDto?] {
    const { id_insumo, id_almacen, cantidad } = props;

    if (!id_insumo) return ['id_insumo es requerido', undefined];
    if (!id_almacen) return ['id_almacen es requerido', undefined];
    if (cantidad === undefined || cantidad === null)
      return ['cantidad es requerida', undefined];

    const nCantidad = typeof cantidad === 'string' ? Number(cantidad) : cantidad;
    if (!Number.isInteger(nCantidad) || nCantidad < 0)
      return ['cantidad debe ser un entero >= 0', undefined];

    return [undefined, new CreateInventarioInsumoDto(
      String(id_insumo), String(id_almacen), nCantidad
    )];
  }
}
