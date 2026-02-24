export class UpdateMarcaDto {
  private constructor(
    public readonly nombre?: string,
    public readonly descripcion?: string | null,
    public readonly activo?: boolean,
    public readonly fecha_editado?: Date,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.nombre) returnObj.nombre = this.nombre;
    if (this.descripcion !== undefined) returnObj.descripcion = this.descripcion;
    if (this.activo !== undefined) returnObj.activo = this.activo;

    returnObj.fecha_editado = new Date();

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateMarcaDto?] {
    let { nombre, descripcion, activo } = props;

    if (nombre !== undefined && nombre !== null) nombre = String(nombre).trim();
    if (descripcion !== undefined && descripcion !== null) descripcion = String(descripcion).trim();
    if (activo !== undefined) activo = Boolean(activo);

    return [
      undefined,
      new UpdateMarcaDto(
        nombre,
        descripcion,
        activo,
        new Date(),
      ),
    ];
  }
}