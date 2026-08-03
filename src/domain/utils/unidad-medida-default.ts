export function getUnidadMedidaDefault(entidad: string): string {
    switch (entidad) {
        case 'LOTE':
        case 'LOTE_TOSTADO':
        case 'MUESTRA':
            return 'kg';
        case 'BOLSA':
        case 'PRODUCTO':
        case 'INSUMO':
            return 'unidad';
        default:
            return 'unidad';
    }
}