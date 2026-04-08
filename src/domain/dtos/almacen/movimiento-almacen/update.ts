export class UpdateMovimientoAlmacenDto {

  private constructor(
    public readonly comentario?: string,
  ) {}

  get values() {
    const out: { [key: string]: any } = {};
    if (this.comentario !== undefined) {
      out.comentario = this.comentario;
    }
    return out;
  }

  static update(props: { [key: string]: any }): [string?, UpdateMovimientoAlmacenDto?] {

    const { comentario } = props;

    if (comentario !== undefined && typeof comentario !== 'string') {
      return ['comentario debe ser texto', undefined];
    }

    return [
      undefined,
      new UpdateMovimientoAlmacenDto(
        comentario?.trim()
      )
    ];
  }
}
