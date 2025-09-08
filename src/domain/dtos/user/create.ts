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
    ) {}

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
        if (!fecha_nacimiento) return ['fecha_nacimiento property is required', undefined];
        if (!departamento) return ['departamento property is required', undefined];
        if (!direccion) return ['direccion property is required', undefined];
        if (!numero_telefono) return ['numero_telefono property is required', undefined];
        if (rol === undefined || rol === null) return ['rol property is required', undefined];
        if (!password) return ['password property is required', undefined];



        return [undefined, new CreateUserDto(
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
        )];
    }
}
