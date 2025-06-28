export class UpdateAnalisisDefectosDto {
  constructor(
    public grano_negro?: number,
    public grano_agrio?: number,
    public grano_con_hongos?: number,
    public cereza_seca?: number,
    public materia_estrana?: number,
    public broca_severa?: number,
    public negro_parcial?: number,
    public agrio_parcial?: number,
    public pergamino?: number,
    public flotadores?: number,
    public inmaduro?: number,
    public averanado?: number,
    public conchas?: number,
    public cascara_pulpa_seca?: number,
    public partido_mordido_cortado?: number,
    public broca_leva?: number,
    public grado?:string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.grano_negro !== undefined) returnObj.grano_negro = this.grano_negro;
    if (this.grano_agrio !== undefined) returnObj.grano_agrio = this.grano_agrio;
    if (this.grano_con_hongos !== undefined) returnObj.grano_con_hongos = this.grano_con_hongos;
    if (this.cereza_seca !== undefined) returnObj.cereza_seca = this.cereza_seca;
    if (this.materia_estrana !== undefined) returnObj.materia_estrana = this.materia_estrana;
    if (this.broca_severa !== undefined) returnObj.broca_severa = this.broca_severa;
    if (this.negro_parcial !== undefined) returnObj.negro_parcial = this.negro_parcial;
    if (this.agrio_parcial !== undefined) returnObj.agrio_parcial = this.agrio_parcial;
    if (this.pergamino !== undefined) returnObj.pergamino = this.pergamino;
    if (this.flotadores !== undefined) returnObj.flotadores = this.flotadores;
    if (this.inmaduro !== undefined) returnObj.inmaduro = this.inmaduro;
    if (this.averanado !== undefined) returnObj.avernado = this.averanado;
    if (this.conchas !== undefined) returnObj.conchas = this.conchas;
    if (this.cascara_pulpa_seca !== undefined) returnObj.cascara_pulpa_seca = this.cascara_pulpa_seca;
    if (this.partido_mordido_cortado !== undefined) returnObj.partido_mordido_cortado = this.partido_mordido_cortado;
    if (this.broca_leva !== undefined) returnObj.broca_leva = this.broca_leva;
    if (this.grado!==undefined)returnObj.grado =this.grado;
    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateAnalisisDefectosDto?] {
    const {
      grano_negro,
      grano_agrio,
      grano_con_hongos,
      cereza_seca,
      materia_estrana,
      broca_severa,
      negro_parcial,
      agrio_parcial,
      pergamino,
      flotadores,
      inmaduro,
      averanado,
      conchas,
      cascara_pulpa_seca,
      partido_mordido_cortado,
      broca_leva,
      grado
    } = props;

    return [
      undefined,
      new UpdateAnalisisDefectosDto(
        grano_negro,
        grano_agrio,
        grano_con_hongos,
        cereza_seca,
        materia_estrana,
        broca_severa,
        negro_parcial,
        agrio_parcial,
        pergamino,
        flotadores,
        inmaduro,
        averanado,
        conchas,
        cascara_pulpa_seca,
        partido_mordido_cortado,
        broca_leva,
        grado
      ),
    ];
  }
}