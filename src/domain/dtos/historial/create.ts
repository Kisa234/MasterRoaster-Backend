export class CreateHistorialDto {
    private constructor(
        public entidad: string,
        public id_entidad: string,
        public id_user: string,
        public accion: string,
        public comentario?: string,
        public objeto_antes?: any | null,
    ) { }

    static create ( props: { [key: string]: any } ): [string?, CreateHistorialDto?] {
        const { entidad, id_entidad, id_user, accion, comentario, objeto_antes } = props;

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

