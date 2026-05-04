export class StartBalonGasDto {
  private constructor(
    public id_balon_gas: string,
    public id_tueste_inicio: string,
    public id_user_inicio_uso: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, StartBalonGasDto?] {
    const {
      id_balon_gas,
      id_tueste_inicio,
      id_user_inicio_uso,
    } = props;

    if (!id_balon_gas) return ['El id del balón de gas es obligatorio'];
    if (!id_tueste_inicio) return ['El tueste donde se realiza el cambio es obligatorio'];
    if (!id_user_inicio_uso) return ['El usuario que realiza el cambio es obligatorio'];

    return [
      undefined,
      new StartBalonGasDto(
        id_balon_gas,
        id_tueste_inicio,
        id_user_inicio_uso,
      ),
    ];
  }
}