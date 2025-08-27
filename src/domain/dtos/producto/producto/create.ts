export class CreateProductoDto {
  private constructor(
    public readonly nombre       : string,
    public readonly descripcion? : string,
    public readonly id_lote?     : string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductoDto?] {
    let {
      nombre,
      descripcion,
      id_lote,
    } = props;

    if (!nombre) return ['El nombre es requerido', undefined];

    return [undefined, new CreateProductoDto(
      nombre,
      descripcion,
      id_lote,
    )];
  }
}
