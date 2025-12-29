export class CreateCambioDto {

    private constructor(
        public readonly entidad: string,
        public readonly id_entidad: string,
        public readonly objeto_antes: any,
        public readonly id_user: string,
        public readonly comentario: string | null,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateCambioDto?] {
        const { entidad, id_entidad, objeto_antes, id_user, comentario } = props;

        if (!entidad) return ['entidad property is required', undefined];
        if (!id_entidad) return ['id_entidad property is required', undefined];
        if (!objeto_antes) return ['objeto_antes property is required', undefined];
        if (!id_user) return ['id_user property is required', undefined];

        return [undefined, new CreateCambioDto(
            entidad,
            id_entidad,
            objeto_antes,
            id_user,
            comentario ?? null
        )];
    }
}
