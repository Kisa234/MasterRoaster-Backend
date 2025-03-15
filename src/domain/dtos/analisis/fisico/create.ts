
export class CreateAnalisisFisicoDto {
    private constructor(
        public readonly peso_muestra: number,
        public readonly peso_pergamino: number,
        public readonly wa: number,
        public readonly temperatura_wa: number,
        public readonly humedad: number,
        public readonly temperatura_humedad: number,
        public readonly densidad: number,
        public readonly color_grano_verde: string,
        public readonly olor: string,
        public readonly superior_malla_18: number,
        public readonly superior_malla_16: number,
        public readonly superior_malla_14: number,
        public readonly menor_malla_16: number,
        public readonly peso_defectos: number,
        public readonly quaquers: number,
        public readonly peso_muestra_tostada: number,
        public readonly desarrollo: number,
        public readonly pocentaje_caramelizcacion: number,
        public readonly c_desarrollo: number,
        public readonly grado: string,
        public readonly comentario: string,
        public readonly defectos_primarios: string[],
        public readonly defectos_secundarios: string[],
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateAnalisisFisicoDto?] {
        const {
            peso_muestra, peso_pergamino, wa, temperatura_wa,
            humedad, temperatura_humedad, densidad, color_grano_verde,
            olor, superior_malla_18, superior_malla_16, superior_malla_14,
            menor_malla_16, peso_defectos, quaquers, peso_muestra_tostada,
            desarrollo, pocentaje_caramelizcacion, c_desarrollo, grado,
            comentario, defectos_primarios, defectos_secundarios
         } = props;

        if (peso_muestra === undefined) return ['El peso de la muestra es requerido', undefined];
        if (peso_pergamino === undefined) return ['El peso del pergamino es requerido', undefined];
        if (wa === undefined) return ['El wa es requerido', undefined];
        if (temperatura_wa === undefined) return ['La temperatura wa es requerida', undefined];
        if (humedad === undefined) return ['La humedad es requerida', undefined]; 
        if (temperatura_humedad === undefined) return ['La temperatura de la humedad es requerida', undefined];
        if (densidad === undefined) return ['La densidad es requerida', undefined];
        if (color_grano_verde === undefined) return ['El color del grano verde es requerido', undefined];
        if (olor === undefined) return ['El olor es requerido', undefined];
        if (superior_malla_18 === undefined) return ['El superior malla 18 es requerido', undefined];
        if (superior_malla_16 === undefined) return ['El superior malla 16 es requerido', undefined];
        if (superior_malla_14 === undefined) return ['El superior malla 14 es requerido', undefined];
        if (menor_malla_16 === undefined) return ['El menor malla 16 es requerido', undefined];
        if (peso_defectos === undefined) return ['El peso de defectos es requerido', undefined];
        if (quaquers === undefined) return ['El quaquers es requerido', undefined];
        if (peso_muestra_tostada === undefined) return ['El peso de la muestra tostada es requerido', undefined];
        if (desarrollo === undefined) return ['El desarrollo es requerido', undefined];
        if (pocentaje_caramelizcacion === undefined) return ['El porcentaje de caramelización es requerido', undefined];
        if (c_desarrollo === undefined) return ['El c desarrollo es requerido', undefined];
        if (grado === undefined) return ['El grado es requerido', undefined];
        if (!comentario) return ['El comentario es requerido', undefined];
        if (!defectos_primarios) return ['Los defectos primarios son requeridos', undefined];
        if (!defectos_secundarios) return ['Los defectos secundarios son requeridos', undefined];



        return [undefined, new CreateAnalisisFisicoDto(
            props.peso_muestra, props.peso_pergamino, props.wa, props.temperatura_wa,
            props.humedad, props.temperatura_humedad, props.densidad, props.color_grano_verde,
            props.olor, props.superior_malla_18, props.superior_malla_16, props.superior_malla_14,
            props.menor_malla_16, props.peso_defectos, props.quaquers, props.peso_muestra_tostada,
            props.desarrollo, props.pocentaje_caramelizcacion, props.c_desarrollo, props.grado,
            props.comentario, props.defectos_primarios, props.defectos_secundarios
        )];
    }
}
