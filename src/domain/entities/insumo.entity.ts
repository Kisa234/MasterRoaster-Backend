export class InsumoEntity {

  constructor(
    public id_insumo: string,
    public nombre: string,
    public id_categoria: string,
    public unidad_medida: string,
    public descripcion?: string,
    public activo?: boolean,
    public created_at?: Date,
  ) {}

  static fromObject(obj: { [key: string]: any }): InsumoEntity {
    const {
      id_insumo,
      nombre,
      id_categoria,
      descripcion,
      unidad_medida,
      activo,
      created_at
    } = obj;

    if (!id_insumo) throw new Error('id_insumo es requerido');
    if (!nombre) throw new Error('nombre es requerido');
    if (!id_categoria) throw new Error('categoria es requerida');
    if (!unidad_medida) throw new Error('unidad_medida es requerida');

    let newCreatedAt: Date | undefined = undefined;
    if (created_at) {
      newCreatedAt = new Date(created_at);
      if (isNaN(newCreatedAt.getTime())) throw new Error('created_at no es válido');
    }

    return new InsumoEntity(
      String(id_insumo),
      String(nombre).trim(),
      String(id_categoria).trim(),
      String(unidad_medida).trim(),
      descripcion !== undefined && descripcion !== null ? String(descripcion) : undefined,
      activo !== undefined ? Boolean(activo) : undefined,
      newCreatedAt
    );
  }
}
