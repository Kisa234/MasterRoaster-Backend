export class CreateHistorialDto {
    private constructor(
        public entidad: string,
        public id_entidad: string,
        public id_user: string,
        public accion: string,
        public comentario: string,
        public objeto_antes?: any | null,
    ) { }

    static create ( props: { [key: string]: any } ): [string?, CreateHistorialDto?] {
        const { entidad, id_entidad, id_user, accion, comentario, fecha_registro, objeto_antes } = props;

        if (!id_user) return ['El id_user es requerido', undefined];    
        if (!entidad) return ['La entidad es requerida', undefined];
        if (!id_entidad) return ['El id_entidad es requerido', undefined];
        if (!accion) return ['La accion es requerida', undefined];
        if (!comentario) return ['El comentario es requerido', undefined];


        return [undefined,
            new CreateHistorialDto(
                entidad,
                id_entidad,
                id_user,
                accion,
                comentario,
                objeto_antes,
            )
        ]
            
    }
}

