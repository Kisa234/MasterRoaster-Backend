export class CreateInventarioMuestraDto {

  private constructor(
    public readonly id_muestra: string,
    public readonly id_almacen: string,
    public readonly peso: number,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateInventarioMuestraDto?] {

    const { id_muestra, id_almacen, peso } = props;

    if (!id_muestra) return ['id_muestra es requerido', undefined];
    if (!id_almacen) return ['id_almacen es requerido', undefined];

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
      new CreateInventarioMuestraDto(
        String(id_muestra),
        String(id_almacen),
        nPeso
      )
    ];
  }
}
