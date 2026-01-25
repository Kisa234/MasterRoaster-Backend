export class InventarioMuestraEntity {

  constructor(
    public id_inventario: string,
    public id_muestra: string,
    public id_almacen: string,
    public peso: number,
    public fecha_registro: Date,
    public fecha_editado?: Date,
  ) {}

  static fromObject(obj: { [key: string]: any }): InventarioMuestraEntity {

    const {
      id_inventario,
      id_muestra,
      id_almacen,
      peso,
      fecha_registro,
      fecha_editado,
    } = obj;

    if (!id_inventario) throw new Error('id_inventario property is required');
    if (!id_muestra) throw new Error('id_muestra property is required');
    if (!id_almacen) throw new Error('id_almacen property is required');

    if (peso === undefined || peso === null) {
      throw new Error('peso property is required');
    }
    if (typeof peso !== 'number' || isNaN(peso) || peso < 0) {
      throw new Error('peso must be a number >= 0');
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

    return new InventarioMuestraEntity(
      id_inventario,
      id_muestra,
      id_almacen,
      peso,
      fr,
      fe
    );
  }
}
