export class UpdateFullBoxTemplateDto {

  constructor(
    public readonly nombre?: string,
    public readonly descripcion?: string | null,
    public readonly activo?: boolean,
    public readonly cafe_fijo_1?: string,
    public readonly tueste_fijo_1?: string[],
    public readonly cafe_fijo_2?: string,
    public readonly tueste_fijo_2?: string[],
    public readonly opciones?: { id_cafe: string, tuestes: string[] }[]
  ) {}

  static create(props: any): [string?, UpdateFullBoxTemplateDto?] {
    const {
      nombre,
      descripcion,
      activo,
      cafe_fijo_1,
      tueste_fijo_1,
      cafe_fijo_2,
      tueste_fijo_2,
      opciones
    } = props;

    if (tueste_fijo_1 && !Array.isArray(tueste_fijo_1))
      return ['tueste_fijo_1 debe ser un array', undefined];

    if (tueste_fijo_2 && !Array.isArray(tueste_fijo_2))
      return ['tueste_fijo_2 debe ser un array', undefined];

    if (opciones && !Array.isArray(opciones))
      return ['opciones debe ser un array', undefined];

    return [undefined, new UpdateFullBoxTemplateDto(
      nombre,
      descripcion ?? null,
      activo,
      cafe_fijo_1,
      tueste_fijo_1,
      cafe_fijo_2,
      tueste_fijo_2,
      opciones
    )];
  }
}
