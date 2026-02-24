export class CreateMarcaDto {
  private constructor(
    public readonly nombre: string,
    public readonly descripcion?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateMarcaDto?] {
    const { nombre, descripcion } = props;

    if (!nombre || String(nombre).trim().length === 0) {
      return ['nombre es requerido'];
    }

    return [
      undefined,
      new CreateMarcaDto(
        String(nombre).trim(),
        descripcion !== undefined && descripcion !== null && String(descripcion).trim().length > 0
          ? String(descripcion).trim()
          : undefined
      ),
    ];
  }
}