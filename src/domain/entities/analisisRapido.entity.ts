export class AnalisisRapidoEntity {
  constructor(
    public id_analisis_rapido: string,
    public fecha_registro: Date,
    public fragancia: string,
    public aroma: string,
    public floral: boolean,
    public afrutado: boolean,
    public bayas: boolean,
    public frutos_secos: boolean,
    public citricos: boolean,
    public acido_fermentado: boolean,
    public acido: boolean,
    public fermentado: boolean,
    public verde_vegetal: boolean,
    public otros: boolean,
    public quimico: boolean,
    public rancio: boolean,
    public tierra: boolean,
    public papel: boolean,
    public tostado: boolean,
    public nueces_cacao: boolean,
    public nueces: boolean,
    public cocoa: boolean,
    public especias: boolean,
    public dulce: boolean,
    public vainilla: boolean,
    public azucar_morena: boolean,
    public comentario?: string,
    public eliminado: boolean = false,
  ) {}

  public static fromObject(obj: { [key: string]: any }): AnalisisRapidoEntity {
    const {
      id_analisis_rapido,
      fecha_registro,
      fragancia,
      aroma,
      floral,
      afrutado,
      bayas,
      frutos_secos,
      citricos,
      acido_fermentado,
      acido,
      fermentado,
      verde_vegetal,
      otros,
      quimico,
      rancio,
      tierra,
      papel,
      tostado,
      nueces_cacao,
      nueces,
      cocoa,
      especias,
      dulce,
      vainilla,
      azucar_morena,
      comentario,
      eliminado = false,
    } = obj;

    if (!id_analisis_rapido) throw new Error('id_analisis_rapido es requerido');
    if (!fecha_registro) throw new Error('fecha_registro es requerido');
    if (fragancia == null) throw new Error('fragancia es requerido');
    if (aroma == null) throw new Error('aroma es requerido');
    [
      floral, afrutado, bayas, frutos_secos, citricos, acido_fermentado,
      acido, fermentado, verde_vegetal, otros, quimico, rancio,
      tierra, papel, tostado, nueces_cacao, nueces, cocoa,
      especias, dulce, vainilla, azucar_morena
    ].forEach((field, idx) => {
      if (field === undefined) throw new Error(idx + ' es requerido');
    });

    const fecha = new Date(fecha_registro);
    if (isNaN(fecha.getTime())) throw new Error('fecha_registro no es válida');

    return new AnalisisRapidoEntity(
      id_analisis_rapido,
      fecha,
      fragancia,
      aroma,
      floral,
      afrutado,
      bayas,
      frutos_secos,
      citricos,
      acido_fermentado,
      acido,
      fermentado,
      verde_vegetal,
      otros,
      quimico,
      rancio,
      tierra,
      papel,
      tostado,
      nueces_cacao,
      nueces,
      cocoa,
      especias,
      dulce,
      vainilla,
      azucar_morena,
      comentario,
      eliminado,
    );
  }
}
