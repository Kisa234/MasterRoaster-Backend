export class AlmacenEntity {

  constructor(
    public id_almacen: string,
    public nombre: string,
    public descripcion?: string,
    public activo?: boolean,
    public created_at?: Date,
  ) {}

  static fromObject(obj: { [key: string]: any }): AlmacenEntity {

    const { id_almacen, nombre, descripcion, activo, created_at } = obj;

    if (!id_almacen) throw new Error('id_almacen es requerido');
    if (!nombre) throw new Error('nombre es requerido');

    let newCreatedAt: Date | undefined = undefined;
    if (created_at) {
      newCreatedAt = new Date(created_at);
      if (isNaN(newCreatedAt.getTime())) {
        throw new Error('created_at no es válido');
      }
    }

    return new AlmacenEntity(
        id_almacen,
        nombre,
        descripcion,
        activo,
        newCreatedAt,
    );
  }
}
