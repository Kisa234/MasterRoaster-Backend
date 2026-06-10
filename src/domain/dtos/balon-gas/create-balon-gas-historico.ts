export class CreateBalonGasHistoricoDto {
  private constructor(
    public readonly precio: number,
    public readonly id_user_ingreso: string,
    public readonly id_tueste_inicio: string,
    public readonly id_tueste_fin: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateBalonGasHistoricoDto?] {
    const { precio, id_user_ingreso, id_tueste_inicio, id_tueste_fin } = props;

    if (precio === undefined || precio === null || precio === '') return ['El precio es obligatorio'];
    if (isNaN(Number(precio))) return ['El precio debe ser un número válido'];
    if (Number(precio) <= 0) return ['El precio debe ser mayor a 0'];
    if (!id_user_ingreso) return ['El usuario es obligatorio'];
    if (!id_tueste_inicio) return ['El tueste de inicio es obligatorio'];
    if (!id_tueste_fin) return ['El tueste de fin es obligatorio'];

    return [undefined, new CreateBalonGasHistoricoDto(
      Number(precio),
      id_user_ingreso,
      id_tueste_inicio,
      id_tueste_fin,
    )];
  }
}