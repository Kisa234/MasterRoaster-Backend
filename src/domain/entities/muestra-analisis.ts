export class MuestraAnalisisEntity {
  constructor(
    public readonly id: string,
    public readonly id_muestra: string,
    public readonly id_analisis: string,
    public readonly fecha_agregado: Date
  ) {}

  public static fromObject(obj: Record<string, any>): MuestraAnalisisEntity {
    const { id, id_muestra, id_analisis, fecha_agregado } = obj;

    if (!id) throw new Error('id es requerido');
    if (!id_muestra) throw new Error('id_muestra es requerido');
    if (!id_analisis) throw new Error('id_analisis es requerido');
    if (!fecha_agregado) throw new Error('fecha_agregado es requerido');

    const fecha = new Date(fecha_agregado);
    if (isNaN(fecha.getTime())) {
      throw new Error('fecha_agregado no es una fecha válida');
    }

    return new MuestraAnalisisEntity(id, id_muestra, id_analisis, fecha);
  }
}
