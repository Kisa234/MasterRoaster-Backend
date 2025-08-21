export class CreateNotasDto {
  private constructor(
    public readonly name    : string,
    public readonly color   : string,
    public readonly parentId?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateNotasDto?] {
    let { name, color, parentId } = props;

    if (!name)  return ['El name es requerido', undefined];
    if (!color) return ['El color es requerido', undefined];

    return [undefined, new CreateNotasDto(
      name,
      color,
      parentId,
    )];
  }
}
