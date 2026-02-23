export class CreateInsumoDto {

  private constructor(
    public readonly nombre: string,
    public readonly id_categoria: string,
    public readonly unidad_medida: string,
    public readonly descripcion?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateInsumoDto?] {

    const { nombre, id_categoria, unidad_medida, descripcion } = props;

    if (!nombre) return ['nombre es requerido', undefined];
    if (typeof nombre !== 'string') return ['nombre debe ser texto', undefined];

    if (!id_categoria) return ['categoria es requerida', undefined];
    if (typeof id_categoria !== 'string') return ['categoria debe ser texto', undefined];

    if (!unidad_medida) return ['unidad_medida es requerida', undefined];
    if (typeof unidad_medida !== 'string') return ['unidad_medida debe ser texto', undefined];

    if (descripcion !== undefined && descripcion !== null && typeof descripcion !== 'string') {
      return ['descripcion debe ser texto', undefined];
    }

    return [
      undefined,
      new CreateInsumoDto(
        nombre.trim(),
        id_categoria.trim(),
        unidad_medida.trim(),
        descripcion !== undefined && descripcion !== null ? descripcion.trim() : undefined
      )
    ];
  }
}
