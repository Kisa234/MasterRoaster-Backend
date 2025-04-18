export class CreateLoteTostadoDto {
    constructor(
        public id_lote_tostado: string,
        public id_lote: string,
        public fecha_tostado: Date,
        public peso: number ,
        public perfil_tostado: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateLoteTostadoDto?] {
        const {  id_lote, fecha_tostado, perfil_tostado, peso } = props;
        

        if (!id_lote) return ['El id_lote es requerido', undefined];
        if (!perfil_tostado) return ['El perfil_tostado es requerido', undefined];
        if (!peso) return ['El peso es requerido', undefined];
        const newFechaTostado = new Date(fecha_tostado);
        if (isNaN(newFechaTostado.getTime())) {
            return ['La fecha_tostado no es válida', undefined];
        }

        const id_lote_tostado = `${id_lote}-T`;
        
        return [undefined, 
            new CreateLoteTostadoDto(
                id_lote_tostado, 
                id_lote, 
                newFechaTostado,
                peso, 
                perfil_tostado)];
    }

}
