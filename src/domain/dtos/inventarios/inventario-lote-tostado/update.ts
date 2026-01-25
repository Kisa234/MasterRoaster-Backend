export class UpdateInventarioLoteTostadoDto {

  private constructor(
    public readonly cantidad_kg?: number,
  ) {}

  get values() {
    const out: { [key: string]: any } = {};
    if (this.cantidad_kg !== undefined) {
      out.cantidad_kg = this.cantidad_kg;
      out.fecha_editado = new Date();
    }
    return out;
  }

  static update(props: { [key: string]: any }): [string?, UpdateInventarioLoteTostadoDto?] {

    const { cantidad_kg } = props;

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
      new UpdateInventarioLoteTostadoDto(nCantidad)
    ];
  }
}
