// src/domain/entities/ficha-envio.entity.ts
export class FichaEnvioEntity {
  constructor(
    public id_ficha: string,
    public id_envio: string,
    public nombre: string,
    public celular: string,
    public direccion: string,
    public distrito: string,
    public dni?: string,
    public referencia?: string,
    public fecha_registro?: Date,
    public fecha_editado?: Date,
  ) {}

  public static fromObject(obj: { [key: string]: any }): FichaEnvioEntity {
    const {
      id_ficha,
      id_envio,
      nombre,
      celular,
      direccion,
      distrito,
      dni,
      referencia,
      fecha_registro,
      fecha_editado,
    } = obj ?? {};

    // Requeridos
    if (!id_ficha) throw new Error('id_ficha property is required');
    if (!id_envio) throw new Error('id_envio property is required');
    if (nombre === undefined || nombre === null) throw new Error('nombre property is required');
    if (celular === undefined || celular === null) throw new Error('celular property is required');
    if (direccion === undefined || direccion === null) throw new Error('direccion property is required');
    if (distrito === undefined || distrito === null) throw new Error('distrito property is required');

    // Fechas
    let fechaRegistroDt: Date | undefined;
    if (fecha_registro !== undefined && fecha_registro !== null) {
      const d = new Date(fecha_registro);
      if (isNaN(d.getTime())) throw new Error('fecha_registro is not a valid date');
      fechaRegistroDt = d;
    }

    let fechaEditadoDt: Date | undefined;
    if (fecha_editado !== undefined && fecha_editado !== null) {
      const d = new Date(fecha_editado);
      if (isNaN(d.getTime())) throw new Error('fecha_editado is not a valid date');
      fechaEditadoDt = d;
    }

    return new FichaEnvioEntity(
      id_ficha,
      id_envio,
      nombre,
      celular,
      direccion,
      distrito,
      dni,
      referencia,
      fechaRegistroDt,
      fechaEditadoDt,
    );
  }

  
}
