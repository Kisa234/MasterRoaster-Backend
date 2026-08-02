export const MOLIENDA_ABREV: Record<string, string> = {
    ENTERO: 'ENT',
    MOLIENDA_FINA: 'FIN',
    MOLIENDA_MEDIA: 'MED',
    MOLIENDA_GRUESA: 'GRU',
    NINGUNO: 'NIN',
};

export function getMoliendaAbrev(molienda: string): string {
    return MOLIENDA_ABREV[molienda] ?? 'OTR';
}