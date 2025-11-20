export class UpdateBoxOpcionDto {
  private constructor(
    public readonly id_opcion?: string,
    public readonly id_cafe?: string,
    public readonly tuestes?: string[],
  ) {}

  get values() {
    const obj: any = {};
    if (this.id_cafe) obj.id_cafe = this.id_cafe;
    if (this.tuestes) obj.tuestes = this.tuestes;
    return obj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateBoxOpcionDto?] {
    const { id_opcion, id_cafe, tuestes } = props;

    if (tuestes && !Array.isArray(tuestes))
      return ['El campo tuestes debe ser un array', undefined];

    return [undefined, new UpdateBoxOpcionDto(id_opcion, id_cafe, tuestes)];
  }
}
