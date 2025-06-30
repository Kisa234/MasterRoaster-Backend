export class AnalisisFisicoEntity {
  constructor(
    public id_analisis_fisico: string,
    public fecha_registro: Date,
    public peso_muestra: number,
    public peso_pergamino: number,
    public wa: number,
    public temperatura_wa: number,
    public humedad: number,
    public temperatura_humedad: number,
    public densidad: number,
    public color_grano_verde: string,
    public olor: string,
    public superior_malla_18: number,
    public superior_malla_16: number,
    public superior_malla_14: number,
    public menor_malla_16: number,
    public peso_defectos: number,
    public comentario: string,
    public quaquers?: number,
    public peso_muestra_tostada?: number,
    public desarrollo?: number,
    public porcentaje_caramelizacion?: number,
    public c_desarrollo?: number,
    public eliminado?: boolean,
  ) {}

  public static fromObject(obj: any): AnalisisFisicoEntity {
    const {
      id_analisis_fisico,
      fecha_registro,
      peso_muestra,
      peso_pergamino,
      wa,
      temperatura_wa,
      humedad,
      temperatura_humedad,
      densidad,
      color_grano_verde,
      olor,
      superior_malla_18,
      superior_malla_16,
      superior_malla_14,
      menor_malla_16,
      peso_defectos,
      quaquers,
      peso_muestra_tostada,
      desarrollo,
      porcentaje_caramelizacion,
      c_desarrollo,
      comentario,
      eliminado,
    } = obj;

    if (!id_analisis_fisico) throw new Error('id_analisis_fisico es requerido');
    if (!fecha_registro) throw new Error('fecha_registro es requerido');
    if (peso_muestra === undefined) throw new Error('peso_muestra es requerido');
    if (peso_pergamino === undefined) throw new Error('peso_pergamino es requerido');
    if (wa === undefined) throw new Error('wa es requerido');
    if (temperatura_wa === undefined) throw new Error('temperatura_wa es requerido');
    if (humedad === undefined) throw new Error('humedad es requerido');
    if (temperatura_humedad === undefined) throw new Error('temperatura_humedad es requerido');
    if (densidad === undefined) throw new Error('densidad es requerido');
    if (!color_grano_verde) throw new Error('color_grano_verde es requerido');
    if (!olor) throw new Error('olor es requerido');
    if (superior_malla_18 === undefined) throw new Error('superior_malla_18 es requerido');
    if (superior_malla_16 === undefined) throw new Error('superior_malla_16 es requerido');
    if (superior_malla_14 === undefined) throw new Error('superior_malla_14 es requerido');
    if (menor_malla_16 === undefined) throw new Error('menor_malla_16 es requerido');
    if (peso_defectos === undefined) throw new Error('peso_defectos es requerido');
    if (!comentario) throw new Error('comentario es requerido');

    const fecha = new Date(fecha_registro);
    if (isNaN(fecha.getTime())) throw new Error('fecha_registro no es válida');

    return new AnalisisFisicoEntity(
      id_analisis_fisico,
      fecha,
      peso_muestra,
      peso_pergamino,
      wa,
      temperatura_wa,
      humedad,
      temperatura_humedad,
      densidad,
      color_grano_verde,
      olor,
      superior_malla_18,
      superior_malla_16,
      superior_malla_14,
      menor_malla_16,
      peso_defectos,
      comentario,
      quaquers,
      peso_muestra_tostada,
      desarrollo,
      porcentaje_caramelizacion,
      c_desarrollo,
      eliminado,
    );
  }
}