

export class CreateAnalisisDto {

    constructor(
        public readonly analisisFisico_id: string,
        public readonly analisisSensorial_id: string,
    ){}

    static create(props: { [key: string]: any }): [string?, CreateAnalisisDto?] {
        const { fecha_registro, analisisFisico_id, analisisSensorial_id } = props;

        if (!fecha_registro) return ['La fecha de registro es requerida', undefined];
        if (!analisisFisico_id) return ['El analisis fisico es requerido', undefined];
        if (!analisisSensorial_id) return ['El analisis sensorial es requerido', undefined];

        return [undefined, new CreateAnalisisDto(
            analisisFisico_id, analisisSensorial_id
        )];
    }

}