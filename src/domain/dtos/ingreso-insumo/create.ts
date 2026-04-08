export class CreateIngresoInsumoDto {
  private constructor(
    public readonly id_insumo: string,
    public readonly id_almacen: string,
    public readonly cantidad: number,
    public readonly precio_compra: number | null,
    public readonly id_user: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateIngresoInsumoDto?] {
    const { id_insumo, id_almacen, cantidad, precio_compra, id_user } = props;

    if (!id_insumo) return ['id_insumo es requerido', undefined];
    if (!id_almacen) return ['id_almacen es requerido', undefined];
    if (!id_user) return ['id_user es requerido', undefined];

    const nCantidad = typeof cantidad === 'string' ? Number(cantidad) : cantidad;
    if (!Number.isInteger(nCantidad) || nCantidad <= 0) {
      return ['cantidad debe ser un entero > 0', undefined];
    }

    let nPrecio: number | null = null;
    if (precio_compra !== undefined && precio_compra !== null && precio_compra !== '') {
      nPrecio = typeof precio_compra === 'string' ? Number(precio_compra) : precio_compra;
      if (typeof nPrecio !== 'number' || isNaN(nPrecio) || nPrecio < 0) {
        return ['precio_compra debe ser un número >= 0', undefined];
      }
    }

    return [
      undefined,
      new CreateIngresoInsumoDto(
        String(id_insumo),
        String(id_almacen),
        nCantidad,
        nPrecio,
        String(id_user),
      ),
    ];
  }
}