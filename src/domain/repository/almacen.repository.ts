import { AjustarStockAlmacenDto } from "../dtos/almacen/almacen/ajustar-stock";
import { CreateAlmacenDto } from "../dtos/almacen/almacen/create";
import { TrasladarStockAlmacenDto } from "../dtos/almacen/almacen/trasladar-stock";
import { UpdateAlmacenDto } from "../dtos/almacen/almacen/update";
import { AlmacenEntity } from "../entities/almacen.entity";
import { UpdateAlmacen } from "../usecases/almacen/almacen/update";

export abstract class AlmacenRepository {

  abstract createAlmacen(createAlmacenDto: CreateAlmacenDto): Promise<AlmacenEntity>;

  abstract getAlmacenById(id_almacen: string): Promise<AlmacenEntity | null>;

  abstract updateAlmacen(id_almacen: string, updateAlmacenDto: UpdateAlmacenDto): Promise<AlmacenEntity>;

  abstract deleteAlmacen(id_almacen: string): Promise<AlmacenEntity>;

  abstract getAllAlmacenes(): Promise<AlmacenEntity[]>;

  abstract getAlmacenesActivos(): Promise<AlmacenEntity[]>;

}
