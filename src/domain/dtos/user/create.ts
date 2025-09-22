export class CreateUserDto {
    private constructor(
        public readonly nombre: string,
        public readonly nombre_comercial: string | null,
        public readonly email: string,
        public readonly documento_tipo: string | null,
        public readonly documento_identidad: string | null,
        public readonly fecha_nacimiento: Date | null,
        public readonly departamento: string | null,
        public readonly direccion: string | null,
        public readonly numero_telefono: string,
        public readonly rol: string,
        public readonly password: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
        const {
            nombre,
            nombre_comercial,
            email,
            documento_tipo,
            documento_identidad,
            fecha_nacimiento,
            departamento,
            direccion,
            numero_telefono,
            rol,
            password
        } = props;

        if (!nombre) return ['nombre property is required', undefined];
        if (!email) return ['email property is required', undefined];
        if (!documento_tipo) return ['documento_tipo property is required', undefined];
        if (!documento_identidad) return ['documento_identidad property is required', undefined];
        if (!rol) return ['rol property is required', undefined];
        if (!password) return ['password property is required', undefined];

        const newFecha = fecha_nacimiento ? new Date(fecha_nacimiento) : null;

        return [undefined, new CreateUserDto(
            nombre,
            nombre_comercial,
            email,
            documento_tipo,
            documento_identidad,
            newFecha,
            departamento,
            direccion,
            numero_telefono,
            rol,
            password
        )];
    }
}
