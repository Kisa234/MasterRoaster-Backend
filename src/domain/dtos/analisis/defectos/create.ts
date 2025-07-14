
export class CreateAnalisisDefectosDto {
  constructor(
    public grano_negro: number,
    public grano_agrio: number,
    public grano_con_hongos: number,
    public cereza_seca: number,
    public materia_estrana: number,
    public broca_severa: number,
    public negro_parcial: number,
    public agrio_parcial: number,
    public pergamino: number,
    public flotadores: number,
    public inmaduro: number,
    public averanado: number,
    public conchas: number,
    public cascara_pulpa_seca: number,
    public partido_mordido_cortado: number,
    public broca_leva: number,
    public grado: string,
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateAnalisisDefectosDto?] {
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
      new CreateAnalisisDefectosDto(
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