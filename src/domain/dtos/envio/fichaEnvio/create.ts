export class CreateFichaEnvioDto {
  private constructor(
    public readonly id_envio: string,
    public readonly nombre: string,
    public readonly celular: string,
    public readonly direccion: string,
    public readonly distrito: string,
    public readonly dni?: string,
    public readonly referencia?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateFichaEnvioDto?] {
    let {
      id_envio,
      nombre,
      celular,
      direccion,
      distrito,
      dni,
      referencia,
    } = props;

    if (!id_envio)  return ['id_envio es requerido', undefined];
    if (!nombre)    return ['El nombre es requerido', undefined];
    if (!celular)   return ['El celular es requerido', undefined];
    if (!direccion) return ['La dirección es requerida', undefined];
    if (!distrito)  return ['El distrito es requerido', undefined];

    return [undefined, new CreateFichaEnvioDto(
      id_envio,
      nombre,
      celular,
      direccion,
      distrito,
      dni,
      referencia,
    )];
  }
}
