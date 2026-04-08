export class CategoriaInsumoEntity {
  constructor(
    public id_categoria: string,
    public nombre: string,
    public activo?: boolean,
  ) {}

  static fromObject(obj: { [key: string]: any }): CategoriaInsumoEntity {
    const { id_categoria, nombre, activo } = obj;

    if (!id_categoria) throw new Error('id_categoria es requerido');
    if (!nombre) throw new Error('nombre es requerido');

    return new CategoriaInsumoEntity(
      String(id_categoria),
      String(nombre).trim(),
      activo !== undefined ? Boolean(activo) : undefined,
    );
  }
}