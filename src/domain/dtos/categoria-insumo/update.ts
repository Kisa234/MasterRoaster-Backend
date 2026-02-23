export class UpdateCategoriaInsumoDto {
  private constructor(
    public readonly nombre?: string,
    public readonly activo?: boolean,
  ) {}

  static update(props: { [key: string]: any }): [string?, UpdateCategoriaInsumoDto?] {
    const { nombre, activo } = props;

    const dto = new UpdateCategoriaInsumoDto(
      nombre !== undefined ? String(nombre).trim() : undefined,
      activo !== undefined ? Boolean(activo) : undefined,
    );

    // Validación opcional: si viene nombre, no vacío
    if (dto.nombre !== undefined && dto.nombre.length === 0) {
      return ['nombre no puede ser vacío'];
    }

    return [undefined, dto];
  }
}