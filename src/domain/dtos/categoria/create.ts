export class CreateCategoriaDto {
  private constructor(
    public readonly id_categoria: string,
    public readonly nombre: string,
    public readonly descripcion?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateCategoriaDto?] {
    const { id_categoria, nombre, descripcion } = props;

    if (!nombre) return ['El nombre de la categoría es requerido', undefined];
    if (descripcion && typeof descripcion !== 'string')
      return ['La descripción debe ser un texto', undefined];

    return [undefined, new CreateCategoriaDto(id_categoria, nombre, descripcion)];
  }
}