

export class CreateAnalisisDto {

    constructor(
        public readonly analisisFisico_id?: string,
        public readonly analisisSensorial_id?: string,
        public readonly comentario?: string
    ){}

    static create(props: { [key: string]: any }): [string?, CreateAnalisisDto?] {
        const { analisisFisico_id, analisisSensorial_id, comentario } = props;


        return [undefined, new CreateAnalisisDto(
            analisisFisico_id, analisisSensorial_id, comentario
        )];
    }

}