export class UpdateInsumoDto {

  private constructor(
    public readonly nombre?: string,
    public readonly categoria?: string,
    public readonly unidad_medida?: string,
    public readonly descripcion?: string | null,
    public readonly activo?: boolean,
  ) {}

  get values() {
    const out: { [key: string]: any } = {};

    if (this.nombre !== undefined) out.nombre = this.nombre;
    if (this.categoria !== undefined) out.categoria = this.categoria;
    if (this.unidad_medida !== undefined) out.unidad_medida = this.unidad_medida;
    if (this.descripcion !== undefined) out.descripcion = this.descripcion;
    if (this.activo !== undefined) out.activo = this.activo;

    return out;
  }

  static update(props: { [key: string]: any }): [string?, UpdateInsumoDto?] {

    const { nombre, categoria, unidad_medida, descripcion, activo } = props;

    if (nombre !== undefined && typeof nombre !== 'string') {
      return ['nombre debe ser texto', undefined];
    }
    if (categoria !== undefined && typeof categoria !== 'string') {
      return ['categoria debe ser texto', undefined];
    }
    if (unidad_medida !== undefined && typeof unidad_medida !== 'string') {
      return ['unidad_medida debe ser texto', undefined];
    }

    // descripcion admite string o null para limpiar campo
    if (descripcion !== undefined && descripcion !== null && typeof descripcion !== 'string') {
      return ['descripcion debe ser texto o null', undefined];
    }

    if (activo !== undefined && typeof activo !== 'boolean') {
      return ['activo debe ser boolean', undefined];
    }

    return [
      undefined,
      new UpdateInsumoDto(
        nombre !== undefined ? nombre.trim() : undefined,
        categoria !== undefined ? categoria.trim() : undefined,
        unidad_medida !== undefined ? unidad_medida.trim() : undefined,
        descripcion === undefined ? undefined : (descripcion === null ? null : descripcion.trim()),
        activo
      )
    ];
  }
}
