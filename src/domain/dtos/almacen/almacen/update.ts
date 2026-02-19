   export class UpdateAlmacenDto {

  private constructor(
    public readonly nombre?: string,
    public readonly descripcion?: string | null,
    public readonly activo?: boolean,
  ) {}

  get values() {
    const out: { [key: string]: any } = {};

    if (this.nombre !== undefined) out.nombre = this.nombre;
    if (this.descripcion !== undefined) out.descripcion = this.descripcion;
    if (this.activo !== undefined) out.activo = this.activo;

    return out;
  }

  static update(props: { [key: string]: any }): [string?, UpdateAlmacenDto?] {

    const { nombre, descripcion, activo } = props;

    if (nombre !== undefined && typeof nombre !== 'string') {
      return ['nombre debe ser texto', undefined];
    }

    // descripcion: permitimos string o null para limpiar el campo
    if (descripcion !== undefined && descripcion !== null && typeof descripcion !== 'string') {
      return ['descripcion debe ser texto o null', undefined];
    }

    if (activo !== undefined && typeof activo !== 'boolean') {
      return ['activo debe ser boolean', undefined];
    }

    return [
      undefined,
      new UpdateAlmacenDto(
        nombre !== undefined ? nombre.trim() : undefined,
        descripcion === undefined ? undefined : (descripcion === null ? null : descripcion.trim()),
        activo
      )
    ];
  }
}
