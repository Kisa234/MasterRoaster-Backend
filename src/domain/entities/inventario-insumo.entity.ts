export class InventarioInsumoEntity {
  constructor(
    public id_inventario: string,
    public id_insumo: string,
    public id_almacen: string,
    public cantidad: number,          // Int, >= 0
    public fecha_registro: Date,
    public fecha_editado?: Date,
  ) {}

  static fromObject(obj: { [key: string]: any }): InventarioInsumoEntity {
    const {
      id_inventario, id_insumo, id_almacen,
      cantidad, fecha_registro, fecha_editado
    } = obj;

    if (!id_inventario) throw new Error('id_inventario property is required');
    if (!id_insumo) throw new Error('id_insumo property is required');
    if (!id_almacen) throw new Error('id_almacen property is required');

    if (cantidad === undefined || cantidad === null)
      throw new Error('cantidad property is required');
    if (!Number.isInteger(cantidad) || cantidad < 0)
      throw new Error('cantidad must be an integer >= 0');

    if (!fecha_registro) throw new Error('fecha_registro property is required');
    const fr = new Date(fecha_registro);
    if (isNaN(fr.getTime())) throw new Error('fecha_registro is not a valid date');

    let fe: Date | undefined;
    if (fecha_editado) {
      fe = new Date(fecha_editado);
      if (isNaN(fe.getTime())) throw new Error('fecha_editado is not a valid date');
    }

    return new InventarioInsumoEntity(
      id_inventario, id_insumo, id_almacen,
      cantidad, fr, fe
    );
  }
}
