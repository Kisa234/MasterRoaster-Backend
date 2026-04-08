export class CreateCategoriaInsumoDto {
  private constructor(
    public readonly nombre: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateCategoriaInsumoDto?] {
    const { nombre } = props;

    if (!nombre || String(nombre).trim().length === 0) {
      return ['nombre es requerido'];
    }

    return [undefined, new CreateCategoriaInsumoDto(String(nombre).trim())];
  }
}