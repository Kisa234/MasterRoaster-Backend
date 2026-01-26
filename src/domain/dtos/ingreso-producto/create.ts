export class CreateIngresoProductoDto {
  private constructor(
    public readonly id_producto: string,
    public readonly id_variante: string | null,
    public readonly id_almacen: string,
    public readonly cantidad: number,
    public readonly precio_compra: number,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateIngresoProductoDto?] {
    const { id_producto, id_variante, id_almacen, cantidad, precio_compra } = props;

    if (!id_producto) return ['id_producto es requerido', undefined];
    if (!id_almacen) return ['id_almacen es requerido', undefined];

    const nCantidad = typeof cantidad === 'string' ? Number(cantidad) : cantidad;
    if (!Number.isInteger(nCantidad) || nCantidad <= 0)
      return ['cantidad debe ser un entero > 0', undefined];

    const nPrecio = typeof precio_compra === 'string' ? Number(precio_compra) : precio_compra;
    if (typeof nPrecio !== 'number' || isNaN(nPrecio) || nPrecio < 0)
      return ['precio_compra debe ser un número >= 0', undefined];

    return [
      undefined,
      new CreateIngresoProductoDto(
        String(id_producto),
        id_variante ? String(id_variante) : null,
        String(id_almacen),
        nCantidad,
        nPrecio
      )
    ];
  }
}
