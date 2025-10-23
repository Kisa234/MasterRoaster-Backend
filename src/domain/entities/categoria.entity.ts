export class CategoriaEntity {
  constructor(
    public id_categoria: string,
    public nombre: string,
    public descripcion: string | null,
    public fecha_registro: Date,
    public eliminado: boolean,
  ) {}

  public static fromObject(obj: { [key: string]: any }): CategoriaEntity {
    const { id_categoria, nombre, descripcion, fecha_registro, eliminado } = obj;

    if (!id_categoria) throw new Error('id_categoria property is required');
    if (!nombre) throw new Error('nombre property is required');

    return new CategoriaEntity(id_categoria, nombre, descripcion ?? null, fecha_registro, eliminado);
  }
}
