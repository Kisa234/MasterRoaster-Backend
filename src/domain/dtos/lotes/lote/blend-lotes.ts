export class BlendLotesDto {
    private constructor(
        public readonly lotes: [string, number][],
        public readonly id_user: string,
        public readonly idc?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, BlendLotesDto?] {
        const { lotes, id_user, idc } = props;
        if (!lotes || lotes.length === 0) return ['Los lotes son requeridos', undefined];
        if (!id_user) return ['El id de usuario es requerido', undefined];
        if (lotes.length > 3) return ['Sólo puedes mezclar hasta 3 lotes', undefined];
        if (!Array.isArray(lotes) || lotes.some(l => !Array.isArray(l) || l.length !== 2 || typeof l[0] !== 'string')) {
            return ['Los lotes deben ser tuplas [string, number]', undefined];
        }

        return [undefined, new BlendLotesDto(
            lotes,
            id_user,
            idc
        )];
    }

}
