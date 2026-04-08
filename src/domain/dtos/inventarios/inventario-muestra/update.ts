export class UpdateInventarioMuestraDto {

  private constructor(
    public readonly peso?: number,
  ) {}

  get values() {
    const out: { [key: string]: any } = {};
    if (this.peso !== undefined) {
      out.peso = this.peso;
      out.fecha_editado = new Date();
    }
    return out;
  }

  static update(props: { [key: string]: any }): [string?, UpdateInventarioMuestraDto?] {

    const { peso } = props;

    if (peso === undefined || peso === null) {
      return ['peso es requerido', undefined];
    }

    const nPeso = typeof peso === 'string'
      ? Number(peso)
      : peso;

    if (typeof nPeso !== 'number' || isNaN(nPeso) || nPeso < 0) {
      return ['peso debe ser un número >= 0', undefined];
    }

    return [
      undefined,
      new UpdateInventarioMuestraDto(nPeso)
    ];
  }
}
