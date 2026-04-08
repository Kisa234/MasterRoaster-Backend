export class IngresoInsumoEntity {
  constructor(
    public id_ingreso: string,
    public id_insumo: string,
    public id_almacen: string,
    public cantidad: number,
    public precio_compra: number | null,
    public fecha_ingreso: Date,
    public id_user: string,
  ) {}

  static fromObject(obj: { [key: string]: any }): IngresoInsumoEntity {
    const {
      id_ingreso,
      id_insumo,
      id_almacen,
      cantidad,
      precio_compra,
      fecha_ingreso,
      id_user,
    } = obj;

    console.log('Creating IngresoInsumoEntity from object:', obj);

    if (!id_ingreso) throw new Error('id_ingreso property is required');
    if (!id_insumo) throw new Error('id_insumo property is required');
    if (!id_almacen) throw new Error('id_almacen property is required');
    if (!id_user) throw new Error('id_user property is required');

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error('cantidad must be an integer > 0');
    }

    if (
      precio_compra !== null &&
      precio_compra !== undefined &&
      (typeof precio_compra !== 'number' || isNaN(precio_compra) || precio_compra < 0)
    ) {
      throw new Error('precio_compra must be a number >= 0');
    }

    if (!fecha_ingreso) throw new Error('fecha_ingreso property is required');
    const fi = new Date(fecha_ingreso);
    if (isNaN(fi.getTime())) throw new Error('fecha_ingreso is not a valid date');

    return new IngresoInsumoEntity(
      id_ingreso,
      id_insumo,
      id_almacen,
      cantidad,
      precio_compra ?? null,
      fi,
      id_user,
    );
  }
}