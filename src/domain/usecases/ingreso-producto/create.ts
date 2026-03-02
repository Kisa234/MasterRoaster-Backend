import { TipoMovimiento } from "@prisma/client";
import { CreateMovimientoAlmacenDto } from "../../dtos/almacen/movimiento-almacen/create";
import { CreateIngresoProductoDto } from "../../dtos/ingreso-producto/create";
import { CreateInventarioProductoDto } from "../../dtos/inventarios/inventario-producto/create";
import { UpdateInventarioProductoDto } from "../../dtos/inventarios/inventario-producto/update";
import { IngresoProductoEntity } from "../../entities/ingreso-producto.entity";
import { AlmacenRepository } from "../../repository/almacen.repository";
import { IngresoProductoRepository } from "../../repository/ingreso-producto.repository";
import { InventarioProductoRepository } from "../../repository/inventario-producto.repository";
import { MovimientoAlmacenRepository } from '../../repository/movimiento-almacen.repository';


export class CreateIngresoProducto {
  constructor(
    private readonly ingresoProductoRepository: IngresoProductoRepository,
    private readonly almacenRepository: AlmacenRepository,
    private readonly inventarioProductoRepository: InventarioProductoRepository,
    private readonly movimientoAlmacenRepository: MovimientoAlmacenRepository

  ) {}

  async execute(dto: CreateIngresoProductoDto): Promise<IngresoProductoEntity> {
    

    // 1) Validar almacén
    const almacen = await this.almacenRepository.getAlmacenById(dto.id_almacen);
    if (!almacen) throw new Error("Almacén no existe");

    // 2) Crear ingreso (histórico)
    const ingreso = await this.ingresoProductoRepository.createIngreso(dto);

    // 3) Actualizar inventario
    // - Verificar si ya existe un inventario para este producto+almacén
    const inventario = await this.inventarioProductoRepository.getInventariosByProducto(dto.id_producto,);
    const inventarioExistente = inventario.find(inv => inv.id_almacen === dto.id_almacen);
    if (inventarioExistente) {
      // Si existe, actualizar cantidad
      const[error, updatedInventario] =  UpdateInventarioProductoDto.update({
        id_inventario: inventarioExistente.id_inventario,
        cantidad: inventarioExistente.cantidad + dto.cantidad
      })
      await this.inventarioProductoRepository.updateInventario(inventarioExistente.id_inventario, updatedInventario!);
    } else {
      // Si no existe, crear nuevo inventario
      const [error, newInventario] =  CreateInventarioProductoDto.create({
        id_producto: dto.id_producto,
        id_almacen: dto.id_almacen,
        cantidad: dto.cantidad,
      });
      await this.inventarioProductoRepository.createInventario(newInventario!);
    }

     // 4) Registrar movimiento de almacén
    const [errorMovimiento, movimiento] = CreateMovimientoAlmacenDto.create({
      tipo: TipoMovimiento.INGRESO,
      entidad: 'PRODUCTO',
      id_entidad: dto.id_producto,
      cantidad: dto.cantidad,
      id_almacen_destino: dto.id_almacen,
      id_user: dto.id_user
    });    
    await this.movimientoAlmacenRepository.createMovimiento(movimiento!);
   
    console.log('IngresoProducto creado:', ingreso);

    return ingreso;
  }
}
