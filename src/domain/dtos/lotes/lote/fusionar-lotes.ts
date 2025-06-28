export class FusionarLotesDto {
    private constructor(
        public readonly lotes: [string, number][],
    ) { }

    static create(props: { [key: string]: any }): [string?, FusionarLotesDto?] {
        const { lotes } = props;
        if (!lotes || lotes.length === 0) return ['Los lotes son requeridos', undefined];
        if (lotes.length > 2) return ['Sólo puedes mezclar hasta 3 lotes', undefined];
        if (!Array.isArray(lotes) || lotes.some(l => !Array.isArray(l) || l.length !== 2 || typeof l[0] !== 'string')) {
            return ['Los lotes deben ser tuplas [string, number]', undefined];
        }

        return [undefined, new FusionarLotesDto(
            lotes,
        )];
    }

}
