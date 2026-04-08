import { TipoMovimiento } from "@prisma/client";
import { CreateMovimientoAlmacenDto } from "../../dtos/almacen/movimiento-almacen/create";
import { CreateIngresoInsumoDto } from "../../dtos/ingreso-insumo/create";
import { CreateInventarioInsumoDto } from "../../dtos/inventarios/inventario-insumo/create";
import { UpdateInventarioInsumoDto } from "../../dtos/inventarios/inventario-insumo/update";
import { IngresoInsumoEntity } from "../../entities/ingreso-insumo.entity";
import { AlmacenRepository } from "../../repository/almacen.repository";
import { IngresoInsumoRepository } from "../../repository/ingreso-insumo.repository";
import { InventarioInsumoRepository } from "../../repository/inventario-insumo.repository";
import { MovimientoAlmacenRepository } from "../../repository/movimiento-almacen.repository";

export class CreateIngresoInsumo {
  constructor(
    private readonly ingresoInsumoRepository: IngresoInsumoRepository,
    private readonly almacenRepository: AlmacenRepository,
    private readonly inventarioInsumoRepository: InventarioInsumoRepository,
    private readonly movimientoAlmacenRepository: MovimientoAlmacenRepository
  ) { }

  async execute(dto: CreateIngresoInsumoDto): Promise<IngresoInsumoEntity> {

    // 1) Validar almacén
    const almacen = await this.almacenRepository.getAlmacenById(dto.id_almacen);
    if (!almacen) throw new Error("Almacén no existe");

    // 2) Crear ingreso (histórico)
    const ingreso = await this.ingresoInsumoRepository.createIngreso(dto);

    // 3) Actualizar inventario
    // - Verificar si ya existe un inventario para este insumo+almacén
    const inventarios = await this.inventarioInsumoRepository.getInventariosByInsumo(dto.id_insumo);
    const inventarioExistente = inventarios.find(inv => inv.id_almacen === dto.id_almacen);

    if (inventarioExistente) {
      // Si existe, actualizar cantidad
      const [error, updatedInventario] = UpdateInventarioInsumoDto.update({
        id_inventario: inventarioExistente.id_inventario,
        cantidad: inventarioExistente.cantidad + dto.cantidad
      });

      if (error) throw new Error(error);

      await this.inventarioInsumoRepository.updateInventario(
        inventarioExistente.id_inventario,
        updatedInventario!
      );
    } else {
      // Si no existe, crear nuevo inventario
      const [error, newInventario] = CreateInventarioInsumoDto.create({
        id_insumo: dto.id_insumo,
        id_almacen: dto.id_almacen,
        cantidad: dto.cantidad,
      });

      if (error) throw new Error(error);

      await this.inventarioInsumoRepository.createInventario(newInventario!);
    }

    // 4) Registrar movimiento de almacén
    const [errorMovimiento, movimiento] = CreateMovimientoAlmacenDto.create({
      tipo: TipoMovimiento.INGRESO,
      entidad: 'INSUMO',
      id_entidad_primario: dto.id_insumo,
      cantidad: dto.cantidad,
      id_almacen_destino: dto.id_almacen,
      id_user: dto.id_user
    });

    if (errorMovimiento) throw new Error(errorMovimiento);

    await this.movimientoAlmacenRepository.createMovimiento(movimiento!);


    return ingreso;
  }
}