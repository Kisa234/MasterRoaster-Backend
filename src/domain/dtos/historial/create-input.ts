export class CreateHistorialInputDto {
  private constructor(
    public comentario?: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateHistorialInputDto?] {
    const { comentario } = props;
    return [undefined, new CreateHistorialInputDto(comentario)];
  }
}
