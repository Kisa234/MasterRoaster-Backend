import { prisma } from "../../data/postgres";
import { InventarioGenericoDataSource, InventarioItemRef } from "../../domain/datasources/inventario-generico.datasource";

// Implementación del "puente" genérico. Un solo lugar donde se traduce
// EntidadInventario -> tabla concreta de inventario. Agregar un tipo nuevo
// de inventario en el futuro = agregar un `case` acá, sin tocar los use
// cases de Paquete/Envio que consumen esta interfaz.
//
// ⚠️ Nota sobre PRODUCTO: InventarioProducto.gramaje es nullable (Int?),
// pero Prisma NO permite `null` dentro del objeto de clave compuesta
// (id_producto_id_almacen_gramaje_molienda) al usar findUnique/update —
// solo lo acepta como filtro normal. Por eso PRODUCTO usa findFirst/
// updateMany en vez de findUnique/update, a diferencia de los demás casos.
//
// ⚠️ Nota sobre MUESTRA: InventarioMuestra no tiene campo `cantidad`, tiene
// `peso` (Float). Se lo trata como el equivalente de cantidad para este caso.

export class InventarioGenericoDataSourceImpl implements InventarioGenericoDataSource {

    async obtenerStockDisponible(item: InventarioItemRef): Promise<number> {
        switch (item.entidad) {
            case 'LOTE': {
                const inv = await prisma.inventarioLote.findUnique({
                    where: { id_lote_id_almacen: { id_lote: item.id_entidad, id_almacen: item.id_almacen } },
                });
                return inv?.cantidad_kg ?? 0;
            }
            case 'LOTE_TOSTADO': {
                const inv = await prisma.inventarioLoteTostado.findUnique({
                    where: { id_lote_tostado_id_almacen: { id_lote_tostado: item.id_entidad, id_almacen: item.id_almacen } },
                });
                return inv?.cantidad_kg ?? 0;
            }
            case 'BOLSA': {
                const inv = await prisma.inventarioBolsa.findUnique({
                    where: { id_bolsa_id_almacen: { id_bolsa: item.id_entidad, id_almacen: item.id_almacen } },
                });
                return inv?.cantidad ?? 0;
            }
            case 'PRODUCTO': {
                const inv = await prisma.inventarioProducto.findFirst({
                    where: {
                        id_producto: item.id_entidad,
                        id_almacen: item.id_almacen,
                        gramaje: item.gramaje ?? null,
                        molienda: (item.molienda ?? 'NINGUNO') as any,
                    },
                });
                return inv?.cantidad ?? 0;
            }
            case 'INSUMO': {
                const inv = await prisma.inventarioInsumo.findUnique({
                    where: { id_insumo_id_almacen: { id_insumo: item.id_entidad, id_almacen: item.id_almacen } },
                });
                return inv?.cantidad ?? 0;
            }
            case 'MUESTRA': {
                const inv = await prisma.inventarioMuestra.findUnique({
                    where: { id_muestra_id_almacen: { id_muestra: item.id_entidad, id_almacen: item.id_almacen } },
                });
                return inv?.peso ?? 0;
            }
            default:
                throw new Error(`Tipo de entidad de inventario no soportado: ${item.entidad}`);
        }
    }

    async descontarStock(item: InventarioItemRef): Promise<void> {
        switch (item.entidad) {
            case 'LOTE':
                await prisma.inventarioLote.update({
                    where: { id_lote_id_almacen: { id_lote: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { cantidad_kg: { decrement: item.cantidad } },
                });
                return;
            case 'LOTE_TOSTADO':
                await prisma.inventarioLoteTostado.update({
                    where: { id_lote_tostado_id_almacen: { id_lote_tostado: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { cantidad_kg: { decrement: item.cantidad } },
                });
                return;
            case 'BOLSA':
                await prisma.inventarioBolsa.update({
                    where: { id_bolsa_id_almacen: { id_bolsa: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { cantidad: { decrement: item.cantidad } },
                });
                return;
            case 'PRODUCTO':
                await prisma.inventarioProducto.updateMany({
                    where: {
                        id_producto: item.id_entidad,
                        id_almacen: item.id_almacen,
                        gramaje: item.gramaje ?? null,
                        molienda: (item.molienda ?? 'NINGUNO') as any,
                    },
                    data: { cantidad: { decrement: item.cantidad } },
                });
                return;
            case 'INSUMO':
                await prisma.inventarioInsumo.update({
                    where: { id_insumo_id_almacen: { id_insumo: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { cantidad: { decrement: item.cantidad } },
                });
                return;
            case 'MUESTRA':
                await prisma.inventarioMuestra.update({
                    where: { id_muestra_id_almacen: { id_muestra: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { peso: { decrement: item.cantidad } },
                });
                return;
            default:
                throw new Error(`Tipo de entidad de inventario no soportado: ${item.entidad}`);
        }
    }

    async reingresarStock(item: InventarioItemRef): Promise<void> {
        switch (item.entidad) {
            case 'LOTE':
                await prisma.inventarioLote.update({
                    where: { id_lote_id_almacen: { id_lote: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { cantidad_kg: { increment: item.cantidad } },
                });
                return;
            case 'LOTE_TOSTADO':
                await prisma.inventarioLoteTostado.update({
                    where: { id_lote_tostado_id_almacen: { id_lote_tostado: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { cantidad_kg: { increment: item.cantidad } },
                });
                return;
            case 'BOLSA':
                await prisma.inventarioBolsa.update({
                    where: { id_bolsa_id_almacen: { id_bolsa: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { cantidad: { increment: item.cantidad } },
                });
                return;
            case 'PRODUCTO':
                await prisma.inventarioProducto.updateMany({
                    where: {
                        id_producto: item.id_entidad,
                        id_almacen: item.id_almacen,
                        gramaje: item.gramaje ?? null,
                        molienda: (item.molienda ?? 'NINGUNO') as any,
                    },
                    data: { cantidad: { increment: item.cantidad } },
                });
                return;
            case 'INSUMO':
                await prisma.inventarioInsumo.update({
                    where: { id_insumo_id_almacen: { id_insumo: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { cantidad: { increment: item.cantidad } },
                });
                return;
            case 'MUESTRA':
                await prisma.inventarioMuestra.update({
                    where: { id_muestra_id_almacen: { id_muestra: item.id_entidad, id_almacen: item.id_almacen } },
                    data: { peso: { increment: item.cantidad } },
                });
                return;
            default:
                throw new Error(`Tipo de entidad de inventario no soportado: ${item.entidad}`);
        }
    }
}