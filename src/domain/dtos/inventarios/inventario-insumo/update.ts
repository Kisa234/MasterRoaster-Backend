export class UpdateInventarioInsumoDto {
  private constructor(
    public readonly cantidad?: number,
  ) {}

  get values() {
    const out: { [key: string]: any } = {};
    if (this.cantidad !== undefined) {
      out.cantidad = this.cantidad;
      out.fecha_editado = new Date();
    }
    return out;
  }

  static update(props: { [key: string]: any }): [string?, UpdateInventarioInsumoDto?] {
    const { cantidad } = props;

    if (cantidad === undefined || cantidad === null)
      return ['cantidad es requerida', undefined];

    const nCantidad = typeof cantidad === 'string' ? Number(cantidad) : cantidad;
    if (!Number.isInteger(nCantidad) || nCantidad < 0)
      return ['cantidad debe ser un entero >= 0', undefined];

    return [undefined, new UpdateInventarioInsumoDto(nCantidad)];
  }
}
