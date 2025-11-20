export class UpdateBoxTemplateDto {
  private constructor(
    public readonly id_box_template?: string,
    public readonly nombre?: string,
    public readonly descripcion?: string | null,
    public readonly cafe_fijo_1?: string,
    public readonly tueste_fijo_1?: string[],
    public readonly cafe_fijo_2?: string,
    public readonly tueste_fijo_2?: string[],
    public readonly activo?: boolean,
  ) {}

  get values() {
    const obj: any = {};

    if (this.nombre) obj.nombre = this.nombre;

    if (this.descripcion !== undefined)
      obj.descripcion = this.descripcion;

    if (this.cafe_fijo_1)
      obj.cafe_fijo_1 = this.cafe_fijo_1;

    if (this.tueste_fijo_1)
      obj.tueste_fijo_1 = this.tueste_fijo_1;

    if (this.cafe_fijo_2)
      obj.cafe_fijo_2 = this.cafe_fijo_2;

    if (this.tueste_fijo_2)
      obj.tueste_fijo_2 = this.tueste_fijo_2;

    if (this.activo !== undefined)
      obj.activo = this.activo;

    return obj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateBoxTemplateDto?] {
    const {
      id_box_template,
      nombre,
      descripcion,
      cafe_fijo_1,
      tueste_fijo_1,
      cafe_fijo_2,
      tueste_fijo_2,
      activo,
    } = props;

    // Validaciones
    if (tueste_fijo_1 && !Array.isArray(tueste_fijo_1))
      return ['El campo tueste_fijo_1 debe ser un array', undefined];

    if (tueste_fijo_2 && !Array.isArray(tueste_fijo_2))
      return ['El campo tueste_fijo_2 debe ser un array', undefined];

    return [
      undefined,
      new UpdateBoxTemplateDto(
        id_box_template,
        nombre,
        descripcion,
        cafe_fijo_1,
        tueste_fijo_1,
        cafe_fijo_2,
        tueste_fijo_2,
        activo,
      ),
    ];
  }
}
