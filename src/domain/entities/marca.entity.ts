export class MarcaEntity {
  constructor(
    public id_marca: string,
    public nombre: string,
    public descripcion?: string,
    public activo?: boolean,
    public fecha_registro?: Date,
    public fecha_editado?: Date | null,
  ) {}

  static fromObject(obj: { [key: string]: any }): MarcaEntity {
    const {
      id_marca,
      nombre,
      descripcion,
      activo,
      fecha_registro,
      fecha_editado,
    } = obj;

    if (!id_marca) throw new Error('id_marca es requerido');
    if (!nombre) throw new Error('nombre es requerido');

    const fr = fecha_registro ? new Date(fecha_registro) : undefined;
    if (fr && isNaN(fr.getTime())) throw new Error('fecha_registro no es válido');

    const fe = fecha_editado ? new Date(fecha_editado) : null;
    if (fecha_editado && fe && isNaN(fe.getTime())) throw new Error('fecha_editado no es válido');

    return new MarcaEntity(
      String(id_marca),
      String(nombre).trim(),
      descripcion !== undefined && descripcion !== null ? String(descripcion) : undefined,
      activo !== undefined ? Boolean(activo) : undefined,
      fr,
      fe
    );
  }
}