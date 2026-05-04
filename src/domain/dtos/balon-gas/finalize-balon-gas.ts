export class FinalizeBalonGasDto {
  private constructor(
    public id_balon_gas: string,
    public id_tueste_fin: string,
    public id_user_fin_uso: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, FinalizeBalonGasDto?] {
    const {
      id_balon_gas,
      id_tueste_fin,
      id_user_fin_uso,
    } = props;

    if (!id_balon_gas) return ['El id del balón es obligatorio'];
    if (!id_tueste_fin) return ['El tueste de fin es obligatorio'];
    if (!id_user_fin_uso) return ['El usuario que finaliza es obligatorio'];

    return [
      undefined,
      new FinalizeBalonGasDto(
        id_balon_gas,
        id_tueste_fin,
        id_user_fin_uso,
      ),
    ];
  }
}