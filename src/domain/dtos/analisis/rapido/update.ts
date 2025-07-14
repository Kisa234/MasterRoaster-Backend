export class UpdateAnalisisRapidoDto {
  constructor(
    public fragancia?: string,
    public aroma?: string,
    public floral?: boolean,
    public afrutado?: boolean,
    public bayas?: boolean,
    public frutos_secos?: boolean,
    public citricos?: boolean,
    public acido_fermentado?: boolean,
    public acido?: boolean,
    public fermentado?: boolean,
    public verde_vegetal?: boolean,
    public otros?: boolean,
    public quimico?: boolean,
    public rancio?: boolean,
    public tierra?: boolean,
    public papel?: boolean,
    public tostado?: boolean,
    public nueces_cacao?: boolean,
    public nueces?: boolean,
    public cocoa?: boolean,
    public especias?: boolean,
    public dulce?: boolean,
    public vainilla?: boolean,
    public azucar_morena?: boolean,
    public comentario?: string,
  ) {}

  get values(): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    if (this.fragancia !== undefined) result.fragancia = this.fragancia;
    if (this.aroma !== undefined) result.aroma = this.aroma;
    if (this.floral !== undefined) result.floral = this.floral;
    if (this.afrutado !== undefined) result.afrutado = this.afrutado;
    if (this.bayas !== undefined) result.bayas = this.bayas;
    if (this.frutos_secos !== undefined) result.frutos_secos = this.frutos_secos;
    if (this.citricos !== undefined) result.citricos = this.citricos;
    if (this.acido_fermentado !== undefined) result.acido_fermentado = this.acido_fermentado;
    if (this.acido !== undefined) result.acido = this.acido;
    if (this.fermentado !== undefined) result.fermentado = this.fermentado;
    if (this.verde_vegetal !== undefined) result.verde_vegetal = this.verde_vegetal;
    if (this.otros !== undefined) result.otros = this.otros;
    if (this.quimico !== undefined) result.quimico = this.quimico;
    if (this.rancio !== undefined) result.rancio = this.rancio;
    if (this.tierra !== undefined) result.tierra = this.tierra;
    if (this.papel !== undefined) result.papel = this.papel;
    if (this.tostado !== undefined) result.tostado = this.tostado;
    if (this.nueces_cacao !== undefined) result.nueces_cacao = this.nueces_cacao;
    if (this.nueces !== undefined) result.nueces = this.nueces;
    if (this.cocoa !== undefined) result.cocoa = this.cocoa;
    if (this.especias !== undefined) result.especias = this.especias;
    if (this.dulce !== undefined) result.dulce = this.dulce;
    if (this.vainilla !== undefined) result.vainilla = this.vainilla;
    if (this.azucar_morena !== undefined) result.azucar_morena = this.azucar_morena;
    if (this.comentario !== undefined) result.comentario = this.comentario;
    return result;
  }

  static update(props: { [key: string]: any }): [string?, UpdateAnalisisRapidoDto?] {
    const dto = new UpdateAnalisisRapidoDto(
      props.fragancia,
      props.aroma,
      props.floral,
      props.afrutado,
      props.bayas,
      props.frutos_secos,
      props.citricos,
      props.acido_fermentado,
      props.acido,
      props.fermentado,
      props.verde_vegetal,
      props.otros,
      props.quimico,
      props.rancio,
      props.tierra,
      props.papel,
      props.tostado,
      props.nueces_cacao,
      props.nueces,
      props.cocoa,
      props.especias,
      props.dulce,
      props.vainilla,
      props.azucar_morena,
      props.comentario,
    );
    return [undefined, dto];
  }
}
