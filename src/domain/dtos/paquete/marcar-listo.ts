export class MarcarListoPaqueteDto {
    private constructor(
        public readonly preparado_por_id: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, MarcarListoPaqueteDto?] {
        const { preparado_por_id } = props;

        if (!preparado_por_id) return ['preparado_por_id es requerido', undefined];

        return [undefined, new MarcarListoPaqueteDto(preparado_por_id)];
    }
}
