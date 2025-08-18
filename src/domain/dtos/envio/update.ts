export class UpdateEnvioDto {
  private constructor(
    public readonly comentario?: string,
    public readonly eliminado?: boolean,
  ) {}

  get values() {
    const out: { [key: string]: any } = {};
    // Importante: incluir boolean aunque sea false (verifica undefined)
    if (this.comentario !== undefined) out.comentario = this.comentario;
    if (this.eliminado !== undefined) out.eliminado = this.eliminado;
    return out;
  }

  static update(props: { [key: string]: any }): [string?, UpdateEnvioDto?] {
    const {comentario, eliminado } = props;

    return [undefined, new UpdateEnvioDto(
      comentario,
      typeof eliminado === 'boolean' ? eliminado : undefined,
    )];
  }
}