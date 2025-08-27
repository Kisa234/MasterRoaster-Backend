export class UpdateFichaEnvioDto {
  private constructor(
    public readonly nombre?: string,
    public readonly celular?: string,
    public readonly direccion?: string,
    public readonly distrito?: string,
    public readonly dni?: string,
    public readonly referencia?: string,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.nombre !== undefined)      returnObj.nombre = this.nombre;
    if (this.celular !== undefined)     returnObj.celular = this.celular;
    if (this.direccion !== undefined)   returnObj.direccion = this.direccion;
    if (this.distrito !== undefined)    returnObj.distrito = this.distrito;
    if (this.dni !== undefined)         returnObj.dni = this.dni;
    if (this.referencia !== undefined)  returnObj.referencia = this.referencia;
    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateFichaEnvioDto?] {
    let {
      nombre,
      celular,
      direccion,
      distrito,
      dni,
      referencia,
    } = props;

    return [undefined, new UpdateFichaEnvioDto(
      nombre,
      celular,
      direccion,
      distrito,
      dni,
      referencia,
    )];
  }
}
