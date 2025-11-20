export class CreateBoxOpcionDto {
  private constructor(
    public readonly id_box_template: string,
    public readonly id_cafe: string,
    public readonly tuestes: string[],
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateBoxOpcionDto?] {
    const { id_box_template, id_cafe, tuestes } = props;

    if (!id_box_template)
      return ['El ID del box template es requerido', undefined];

    if (!id_cafe)
      return ['El ID del café es requerido', undefined];

    if (!Array.isArray(tuestes))
      return ['El campo tuestes debe ser un array', undefined];

    return [undefined, new CreateBoxOpcionDto(id_box_template, id_cafe, tuestes)];
  }
}
