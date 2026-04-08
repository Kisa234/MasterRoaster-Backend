export class CreateAlmacenDto {

  private constructor(
    public readonly nombre: string,
    public readonly descripcion?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateAlmacenDto?] {

    const { nombre, descripcion } = props;

    if (!nombre) return ['nombre es requerido', undefined];
    if (typeof nombre !== 'string') return ['nombre debe ser texto', undefined];

    if (descripcion !== undefined && descripcion !== null && typeof descripcion !== 'string') {
      return ['descripcion debe ser texto', undefined];
    }

    return [
      undefined,
      new CreateAlmacenDto(
        nombre,
        descripcion
      )
    ];
  }
}
