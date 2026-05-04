export class BalonGasEntity {
  constructor(
    public id_balon_gas: string,
    public fecha_ingreso: Date,
    public estado: string,
    public precio: number,

    public fecha_inicio_uso?: Date,
    public fecha_fin_uso?: Date,

    public id_tueste_inicio?: string,
    public id_tueste_fin?: string,

    public id_user_ingreso?: string,
    public id_user_inicio_uso?: string,
    public id_user_fin_uso?: string,

    public created_at?: Date,
    public updated_at?: Date,
  ) {}

  static fromObject(object: { [key: string]: any }): BalonGasEntity {
    const {
      id_balon_gas,
      fecha_ingreso,
      fecha_inicio_uso,
      fecha_fin_uso,
      id_tueste_inicio,
      id_tueste_fin,
      estado,
      precio,
      id_user_ingreso,
      id_user_inicio_uso,
      id_user_fin_uso,
      created_at,
      updated_at,
    } = object;

    if (!id_balon_gas) throw 'id_balon_gas is required';
    if (!fecha_ingreso) throw 'fecha_ingreso is required';
    if (!estado) throw 'estado is required';
    if (precio === undefined || precio === null) throw 'precio is required';

    return new BalonGasEntity(
      id_balon_gas,
      fecha_ingreso,
      estado,
      Number(precio),
      fecha_inicio_uso,
      fecha_fin_uso,
      id_tueste_inicio,
      id_tueste_fin,
      id_user_ingreso,
      id_user_inicio_uso,
      id_user_fin_uso,
      created_at,
      updated_at,
    );
  }
}