export class UpdateCategoriaDto {
  private constructor(
    public readonly id_categoria?: string,
    public readonly nombre?: string,
    public readonly descripcion?: string,
  ) {}

  get values() {
    const obj: { [key: string]: any } = {};
    if (this.nombre) obj.nombre = this.nombre;
    if (this.descripcion) obj.descripcion = this.descripcion;
    return obj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateCategoriaDto?] {
    const { id_categoria, nombre, descripcion } = props;

    if (!id_categoria)
      return ['El id_categoria es requerido para actualizar', undefined];

    return [undefined, new UpdateCategoriaDto(id_categoria, nombre, descripcion)];
  }
}