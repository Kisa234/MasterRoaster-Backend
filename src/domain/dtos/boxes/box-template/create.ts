export class CreateBoxTemplateDto {
  private constructor(
    public readonly nombre: string,
    public readonly descripcion: string | null,
    public readonly cafe_fijo_1: string,
    public readonly tueste_fijo_1: string[],
    public readonly cafe_fijo_2: string,
    public readonly tueste_fijo_2: string[],
    public readonly activo: boolean,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateBoxTemplateDto?] {
    const {
      nombre,
      descripcion,
      cafe_fijo_1,
      tueste_fijo_1,
      cafe_fijo_2,
      tueste_fijo_2,
      activo,
    } = props;

    if (!nombre) return ['El nombre del box es requerido', undefined];
    if (!cafe_fijo_1) return ['El café fijo 1 es requerido', undefined];
    if (!Array.isArray(tueste_fijo_1)) return ['tueste_fijo_1 debe ser un array', undefined];

    if (!cafe_fijo_2) return ['El café fijo 2 es requerido', undefined];
    if (!Array.isArray(tueste_fijo_2)) return ['tueste_fijo_2 debe ser un array', undefined];

    if (activo === undefined || activo === null)
      return ['El estado activo es requerido', undefined];

    return [
      undefined,
      new CreateBoxTemplateDto(
        nombre,
        descripcion ?? null,
        cafe_fijo_1,
        tueste_fijo_1,
        cafe_fijo_2,
        tueste_fijo_2,
        activo,
      )
    ];
  }
}
