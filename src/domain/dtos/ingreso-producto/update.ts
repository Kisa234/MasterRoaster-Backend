export class UpdateIngresoProductoDto {
  private constructor(
    public readonly precio_compra?: number,
  ) {}

  get values() {
    const out: { [key: string]: any } = {};
    if (this.precio_compra !== undefined) out.precio_compra = this.precio_compra;
    return out;
  }

  static update(props: { [key: string]: any }): [string?, UpdateIngresoProductoDto?] {
    const { precio_compra } = props;

    if (precio_compra === undefined || precio_compra === null)
      return ['precio_compra es requerido', undefined];

    const nPrecio = typeof precio_compra === 'string' ? Number(precio_compra) : precio_compra;
    if (typeof nPrecio !== 'number' || isNaN(nPrecio) || nPrecio < 0)
      return ['precio_compra debe ser un número >= 0', undefined];

    return [undefined, new UpdateIngresoProductoDto(nPrecio)];
  }
}
