export class CreateDireccionEnvioDto {
    private constructor(
        public readonly id_envio: string,
        public readonly nombre_destinatario: string,
        public readonly telefono: string,
        public readonly direccion: string,
        public readonly distrito: string,
        public readonly provincia: string,
        public readonly departamento: string,
        public readonly pais?: string,
        public readonly codigo_postal?: string,
        public readonly referencia?: string,
        public readonly observaciones?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateDireccionEnvioDto?] {
        const {
            id_envio, nombre_destinatario, telefono, direccion,
            distrito, provincia, departamento, pais,
            codigo_postal, referencia, observaciones,
        } = props;

        if (!id_envio) return ['id_envio es requerido', undefined];
        if (!nombre_destinatario) return ['nombre_destinatario es requerido', undefined];
        if (!telefono) return ['telefono es requerido', undefined];
        if (!direccion) return ['direccion es requerida', undefined];
        if (!distrito) return ['distrito es requerido', undefined];
        if (!provincia) return ['provincia es requerida', undefined];
        if (!departamento) return ['departamento es requerido', undefined];

        return [undefined, new CreateDireccionEnvioDto(
            id_envio, nombre_destinatario, telefono, direccion,
            distrito, provincia, departamento, pais ?? 'Perú',
            codigo_postal, referencia, observaciones,
        )];
    }
}
