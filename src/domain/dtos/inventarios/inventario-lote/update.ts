export class UpdateInventarioLoteDto {

  private constructor(
    public readonly cantidad_kg?: number,
    public readonly cantidad_tostado_kg?: number
  ) {}

  get values() {
    const out: { [key: string]: any } = {};
    if (this.cantidad_kg !== undefined) {out.cantidad_kg = this.cantidad_kg;}
    if (this.cantidad_tostado_kg !== undefined) {out.cantidad_tostado_kg = this.cantidad_tostado_kg;}
    out.fecha_editado = new Date();
    return out;
  }

  static update(props: { [key: string]: any }): [string?, UpdateInventarioLoteDto?] {

    const { cantidad_kg, cantidad_tostado_kg } = props;

    if (cantidad_kg === undefined || cantidad_kg === null) {
      return ['cantidad_kg es requerida', undefined];
    }


    return [
      undefined,
      new UpdateInventarioLoteDto(
        cantidad_kg, 
        cantidad_tostado_kg
      )
    ];
  }
}
