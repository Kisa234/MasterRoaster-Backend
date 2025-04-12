export class UpdateAnalisisRapidoDto {
    private constructor(
        public readonly id_analisis_rapido: string,
        public readonly fecha_registro?: Date,
        public readonly horneado?: boolean,
        public readonly humo?: boolean,
        public readonly uniforme?: boolean,
        public readonly verde?: boolean,
        public readonly arrebatado?: boolean,
        public readonly oscuro?: boolean,
        public readonly comentario?: string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.fecha_registro) returnObj.fecha = this.fecha_registro;
        if (this.horneado !== undefined) returnObj.horneado = this.horneado;
        if (this.humo !== undefined) returnObj.humo = this.humo;
        if (this.uniforme !== undefined) returnObj.uniforme = this.uniforme;
        if (this.verde !== undefined) returnObj.verde = this.verde;
        if (this.arrebatado !== undefined) returnObj.arrebatado = this.arrebatado;
        if (this.oscuro !== undefined) returnObj.oscuro = this.oscuro;
        if (this.comentario) returnObj.comentario = this.comentario;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateAnalisisRapidoDto?] {
        const { id_analisis_rapido, fecha_registro, horneado, humo, uniforme, verde, arrebatado, oscuro, comentario } = props;

        if (!id_analisis_rapido) return ['ID del análisis rápido es requerido', undefined];

        return [undefined, new UpdateAnalisisRapidoDto(id_analisis_rapido, fecha_registro ? new Date(fecha_registro) : undefined, horneado, humo, uniforme, verde, arrebatado, oscuro, comentario)];
    }
}