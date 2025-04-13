

export class CreateAnalisisDto {

    constructor(
        public readonly analisisFisico_id: string,
        public readonly analisisSensorial_id: string,
        public readonly comentario: string
    ){}

    static create(props: { [key: string]: any }): [string?, CreateAnalisisDto?] {
        const { analisisFisico_id, analisisSensorial_id, comentario } = props;

        if (!analisisFisico_id) return ['El analisis fisico es requerido', undefined];
        if (!analisisSensorial_id) return ['El analisis sensorial es requerido', undefined];
        if (!comentario) return ['El comentario es requerido', undefined];

        return [undefined, new CreateAnalisisDto(
            analisisFisico_id, analisisSensorial_id, comentario
        )];
    }

}