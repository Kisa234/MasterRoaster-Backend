export class IngresoProductoEntity {
  constructor(
    public id_ingreso: string,
    public id_producto: string,
    public id_variante: string | null,
    public id_almacen: string,
    public cantidad: number,          
    public precio_compra: number,     
    public fecha_ingreso: Date,
  ) {}

  static fromObject(obj: { [key: string]: any }): IngresoProductoEntity {
    const {
      id_ingreso,
      id_producto,
      id_variante,
      id_almacen,
      cantidad,
      precio_compra,
      fecha_ingreso,
    } = obj;

    if (!id_ingreso) throw new Error('id_ingreso property is required');
    if (!id_producto) throw new Error('id_producto property is required');
    if (!id_almacen) throw new Error('id_almacen property is required');

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error('cantidad must be an integer > 0');
    }
    if (typeof precio_compra !== 'number' || isNaN(precio_compra) || precio_compra < 0) {
      throw new Error('precio_compra must be a number >= 0');
    }

    if (!fecha_ingreso) throw new Error('fecha_ingreso property is required');
    const fi = new Date(fecha_ingreso);
    if (isNaN(fi.getTime())) throw new Error('fecha_ingreso is not a valid date');

    return new IngresoProductoEntity(
      id_ingreso,
      id_producto,
      id_variante ?? null,
      id_almacen,
      cantidad,
      precio_compra,
      fi
    );
  }
}
