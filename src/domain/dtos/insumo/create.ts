export class CreateInsumoDto {

  private constructor(
    public readonly nombre: string,
    public readonly categoria: string,
    public readonly unidad_medida: string,
    public readonly descripcion?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateInsumoDto?] {

    const { nombre, categoria, unidad_medida, descripcion } = props;

    if (!nombre) return ['nombre es requerido', undefined];
    if (typeof nombre !== 'string') return ['nombre debe ser texto', undefined];

    if (!categoria) return ['categoria es requerida', undefined];
    if (typeof categoria !== 'string') return ['categoria debe ser texto', undefined];

    if (!unidad_medida) return ['unidad_medida es requerida', undefined];
    if (typeof unidad_medida !== 'string') return ['unidad_medida debe ser texto', undefined];

    if (descripcion !== undefined && descripcion !== null && typeof descripcion !== 'string') {
      return ['descripcion debe ser texto', undefined];
    }

    return [
      undefined,
      new CreateInsumoDto(
        nombre.trim(),
        categoria.trim(),
        unidad_medida.trim(),
        descripcion !== undefined && descripcion !== null ? descripcion.trim() : undefined
      )
    ];
  }
}
