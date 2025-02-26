import { Analisis } from "./analisis.interface";
import { AnalisisDefectos } from "./analisisDefectos.interface";

enum Olor {
    Olor_Extrano,
    Olor_a_Humedad,
    limpio
  }
  
enum Grado {
    Especial,
    Grado_1,
    Grado_2,
    Grado_3,
    Convencional
  }
  
enum Color {
    Azul_verde,
    Azulado_Verde,
    Verde,
    Verdoso,
    Amarillo_verde,
    Amarillo_Pálido,
    Amarillento,
    Marrón
}


export interface AnalisisFisico {
    id_analisis_fisico: string;
    fecha_registro: Date;
    peso_muestra: number;
    peso_pergamino: number;
    wa: number;
    temperatura_wa: number;
    humedad: number;
    temperatura_humedad: number;
    densidad: number;
    color_grano_verde: Color;
    olor: Olor;
    superior_malla_18: number;
    superior_malla_16: number;
    superior_malla_14: number;
    menor_malla_16: number;
    peso_defectos: number;
    quaquers: number;
    peso_muestra_tostada: number;
    desarrollo: number;
    pocentaje_caramelizcacion: number;
    c_desarrollo: number;
    grado: Grado;
    comentario: string;
    analisis_defectos: AnalisisDefectos[];
  }