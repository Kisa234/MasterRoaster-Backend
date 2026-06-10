export class CreateBalonGasDto {
  private constructor(
    public precio: number,
    public id_user_ingreso: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateBalonGasDto?] {
    const {
      precio,
      id_user_ingreso,
    } = props;

    if (precio === undefined || precio === null || precio === '') return ['El precio es obligatorio'];
    if (isNaN(Number(precio))) return ['El precio debe ser un número válido'];
    if (Number(precio) <= 0) return ['El precio debe ser mayor a 0'];
    if (!id_user_ingreso) return ['El usuario que registra el ingreso es obligatorio'];

    return [
      undefined,
      new CreateBalonGasDto(
        Number(precio),
        id_user_ingreso,
      ),
    ];
  }
}