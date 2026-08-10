export interface CreateDireccionEnvioProps {
    nombre_destinatario: string;
    telefono: string;
    direccion: string;
    distrito: string;
    provincia: string;
    departamento: string;
    pais?: string;
    codigo_postal?: string;
    referencia?: string;
    observaciones?: string;
}

export class CreateEnvioDto {
    private constructor(
        public readonly id_paquete: string,
        public readonly registrado_por_id: string,
        public readonly direccion: CreateDireccionEnvioProps,
        public readonly medio_envio?: string,
        public readonly peso_total_kg?: number,
        public readonly alto_cm?: number,
        public readonly ancho_cm?: number,
        public readonly largo_cm?: number,
        public readonly costo_envio?: number,
        public readonly quien_paga?: string,
        public readonly fecha_programada?: Date,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateEnvioDto?] {
        const {
            id_paquete, registrado_por_id, direccion,
            medio_envio, peso_total_kg, alto_cm, ancho_cm, largo_cm,
            costo_envio, quien_paga, fecha_programada,
        } = props;

        if (!id_paquete) return ['id_paquete es requerido', undefined];
        if (!registrado_por_id) return ['registrado_por_id es requerido', undefined];
        if (!direccion) return ['direccion es requerida', undefined];

        const { nombre_destinatario, telefono, direccion: calle, distrito, provincia, departamento } = direccion;
        if (!nombre_destinatario) return ['direccion.nombre_destinatario es requerido', undefined];
        if (!telefono) return ['direccion.telefono es requerido', undefined];
        if (!calle) return ['direccion.direccion es requerida', undefined];
        if (!distrito) return ['direccion.distrito es requerido', undefined];
        if (!provincia) return ['direccion.provincia es requerida', undefined];
        if (!departamento) return ['direccion.departamento es requerido', undefined];

        return [undefined, new CreateEnvioDto(
            id_paquete, registrado_por_id, direccion,
            medio_envio, peso_total_kg, alto_cm, ancho_cm, largo_cm,
            costo_envio, quien_paga,
            fecha_programada ? new Date(fecha_programada) : undefined,
        )];
    }
}