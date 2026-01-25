export class InventarioLoteEntity {

  constructor(
    public id_inventario: string,
    public id_lote: string,
    public id_almacen: string,
    public cantidad_kg: number,
    public fecha_registro: Date,
    public fecha_editado?: Date,
  ) {}

  static fromObject(obj: { [key: string]: any }): InventarioLoteEntity {

    const {
      id_inventario,
      id_lote,
      id_almacen,
      cantidad_kg,
      fecha_registro,
      fecha_editado,
    } = obj;

    if (!id_inventario) throw new Error('id_inventario property is required');
    if (!id_lote) throw new Error('id_lote property is required');
    if (!id_almacen) throw new Error('id_almacen property is required');

    if (cantidad_kg === undefined || cantidad_kg === null) {
      throw new Error('cantidad_kg property is required');
    }
    if (typeof cantidad_kg !== 'number' || isNaN(cantidad_kg) || cantidad_kg < 0) {
      throw new Error('cantidad_kg must be a number >= 0');
    }

    if (!fecha_registro) throw new Error('fecha_registro property is required');
    const fr = new Date(fecha_registro);
    if (isNaN(fr.getTime())) {
      throw new Error('fecha_registro is not a valid date');
    }

    let fe: Date | undefined;
    if (fecha_editado) {
      fe = new Date(fecha_editado);
      if (isNaN(fe.getTime())) {
        throw new Error('fecha_editado is not a valid date');
      }
    }

    return new InventarioLoteEntity(
      id_inventario,
      id_lote,
      id_almacen,
      cantidad_kg,
      fr,
      fe
    );
  }
}
