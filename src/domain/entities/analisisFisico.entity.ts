
// export enum OLOR{
//     "Olor_Extrano",
//     "Olor_a_Humedad",
//     "limpio",
// }

// export enum GRADO{
//   "Especial",
//   "Grado_1",
//   "Grado_2",
//   "Grado_3",
//   "Convencional",
// }

// export enum COLOR{
//   "Azul_verde",
//   "Azulado_Verde",
//   "Verde",
//   "Verdoso",
//   "Amarillo_verde",
//   "Amarillo_Pálido",
//   "Amarillento",
//   'Marrón'
// }

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
      public quaquers: number,
      public peso_muestra_tostada: number,
      public desarrollo: number,
      public pocentaje_caramelizcacion: number,
      public c_desarrollo: number,
      public grado: string,
      public comentario: string,
      public defectos_primarios: string[],
      public defectos_secundarios: string[],
  ) {}

  public static fromObject(obj: { [key: string]: any }): AnalisisFisicoEntity {
      const { 
          id_analisis_fisico, fecha_registro, peso_muestra, peso_pergamino, wa, temperatura_wa, humedad,
          temperatura_humedad, densidad, color_grano_verde, olor, superior_malla_18, superior_malla_16, 
          superior_malla_14, menor_malla_16, peso_defectos, quaquers, peso_muestra_tostada, desarrollo, 
          pocentaje_caramelizcacion, c_desarrollo, grado, comentario, defectos_primarios, defectos_secundarios 
      } = obj;

      if (!id_analisis_fisico) throw new Error('id_analisis_fisico es requerido');
      if (!fecha_registro) throw new Error('fecha_registro es requerido');
      if (peso_muestra === undefined) throw new Error('peso_muestra es requerido');
      if (peso_pergamino === undefined) throw new Error('peso_pergamino es requerido');
      if (wa === undefined) throw new Error('wa es requerido');
      if (temperatura_wa === undefined) throw new Error('temperatura_wa es requerida');
      if (humedad === undefined) throw new Error('humedad es requerida');
      if (temperatura_humedad === undefined) throw new Error('temperatura_humedad es requerida');
      if (densidad === undefined) throw new Error('densidad es requerida');
      if (color_grano_verde === undefined) throw new Error('color_grano_verde es requerido');
      if (olor === undefined) throw new Error('olor es requerido');
      if (superior_malla_18 === undefined) throw new Error('superior_malla_18 es requerido');
      if (superior_malla_16 === undefined) throw new Error('superior_malla_16 es requerido');
      if (superior_malla_14 === undefined) throw new Error('superior_malla_14 es requerido');
      if (menor_malla_16 === undefined) throw new Error('menor_malla_16 es requerido');
      if (peso_defectos === undefined) throw new Error('peso_defectos es requerido');
      if (quaquers === undefined) throw new Error('quaquers es requerido');
      if (peso_muestra_tostada === undefined) throw new Error('peso_muestra_tostada es requerido');
      if (desarrollo === undefined) throw new Error('desarrollo es requerido');
      if (pocentaje_caramelizcacion === undefined) throw new Error('pocentaje_caramelizcacion es requerido');
      if (c_desarrollo === undefined) throw new Error('c_desarrollo es requerido');
      if (grado === undefined) throw new Error('grado es requerido');
      if (!comentario) throw new Error('comentario es requerido');
      if (!defectos_primarios) throw new Error('defectos_primarios es requerido');
      if (!defectos_secundarios) throw new Error('defectos_secundarios es requerido');

      const newFechaRegistro = new Date(fecha_registro);
      if (isNaN(newFechaRegistro.getTime())) {
          throw new Error('fecha_registro no es válida');
      }

      return new AnalisisFisicoEntity(
          id_analisis_fisico,
          newFechaRegistro,
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
          pocentaje_caramelizcacion,
          c_desarrollo,
          grado,
          comentario,
          defectos_primarios,
          defectos_secundarios
      );
  }
}
