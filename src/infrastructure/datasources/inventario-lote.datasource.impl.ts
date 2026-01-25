import { prisma } from "../../data/postgres";
import { InventarioLoteDataSource } from "../../domain/datasources/inventario-lote.datasource";
import { CreateInventarioLoteDto } from "../../domain/dtos/inventarios/inventario-lote/create";
import { UpdateInventarioLoteDto } from "../../domain/dtos/inventarios/inventario-lote/update";
import { InventarioLoteEntity } from "../../domain/entities/inventario-lote.entity";

export class InventarioLoteDataSourceImpl implements InventarioLoteDataSource {

  async createInventario(
    dto: CreateInventarioLoteDto
  ): Promise<InventarioLoteEntity> {

    const inventario = await prisma.inventarioLote.create({
      data: {
        id_lote: dto.id_lote,
        id_almacen: dto.id_almacen,
        cantidad_kg: dto.cantidad_kg,
      },
    });

    return InventarioLoteEntity.fromObject(inventario);
  }

  async updateInventario(
    id_inventario: string,
    dto: UpdateInventarioLoteDto
  ): Promise<InventarioLoteEntity> {

    const inventario = await prisma.inventarioLote.update({
      where: { id_inventario },
      data: dto.values,
    });

    return InventarioLoteEntity.fromObject(inventario);
  }

  async getByLoteAndAlmacen(
    id_lote: string,
    id_almacen: string
  ): Promise<InventarioLoteEntity | null> {

    const inventario = await prisma.inventarioLote.findFirst({
      where: {
        id_lote,
        id_almacen,
      },
    });

    if (!inventario) return null;
    return InventarioLoteEntity.fromObject(inventario);
  }

  async getByAlmacen(
    id_almacen: string
  ): Promise<InventarioLoteEntity[]> {

    const inventarios = await prisma.inventarioLote.findMany({
      where: { id_almacen },
      orderBy: { fecha_registro: 'asc' },
    });

    return inventarios.map(InventarioLoteEntity.fromObject);
  }
}
