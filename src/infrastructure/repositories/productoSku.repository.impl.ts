import { ProductoSkuDataSource } from '../../domain/datasources/productoSku.datasource';
import { CreateProductoSkuDto } from '../../domain/dtos/producto/productoSku/create';
import { UpdateProductoSkuDto } from '../../domain/dtos/producto/productoSku/update';
import { ProductoSkuEntity } from '../../domain/entities/productoSku.entity';
import { ProductoSkuRepository } from '../../domain/repository/productoSku.repository';

export class ProductoSkuRepositoryImpl implements ProductoSkuRepository {

  constructor(
    private readonly productoSkuDatasource: ProductoSkuDataSource
  ) {}

  // CREATE
  createSku(dto: CreateProductoSkuDto): Promise<ProductoSkuEntity> {
    return this.productoSkuDatasource.createSku(dto);
  }

  // READ
  getSkuById(id_sku: string): Promise<ProductoSkuEntity | null> {
    return this.productoSkuDatasource.getSkuById(id_sku);
  }

  getSkuByCode(sku_code: string): Promise<ProductoSkuEntity | null> {
    return this.productoSkuDatasource.getSkuByCode(sku_code);
  }

  getSkus(): Promise<ProductoSkuEntity[]> {
    return this.productoSkuDatasource.getSkus();
  }

  getSkusByProducto(id_producto: string): Promise<ProductoSkuEntity[]> {
    return this.productoSkuDatasource.getSkusByProducto(id_producto);
  }

  getSkusByLoteTostado(id_lote_tostado: string): Promise<ProductoSkuEntity[]> {
    return this.productoSkuDatasource.getSkusByLoteTostado(id_lote_tostado);
  }

  // UPDATE
  updateSku(id_sku: string, dto: UpdateProductoSkuDto): Promise<ProductoSkuEntity> {
    return this.productoSkuDatasource.updateSku(id_sku, dto);
  }

  setSkuCode(id_sku: string, sku_code: string): Promise<ProductoSkuEntity> {
    return this.productoSkuDatasource.setSkuCode(id_sku, sku_code);
  }

  // STOCK
  incrementStock(id_sku: string, unidades: number): Promise<ProductoSkuEntity> {
    return this.productoSkuDatasource.incrementStock(id_sku, unidades);
  }

  decrementStock(id_sku: string, unidades: number): Promise<ProductoSkuEntity> {
    return this.productoSkuDatasource.decrementStock(id_sku, unidades);
  }

  // HELPERS
  findFirstByCombination(  id_lote_tostado: string,  gramaje: number,  molienda: 'ENTERO' | 'MOLIDO'): Promise<ProductoSkuEntity | null> {
    return this.productoSkuDatasource.findFirstByCombination(id_lote_tostado, gramaje, molienda);
  }

  // DELETE
  deleteSku(id_sku: string): Promise<ProductoSkuEntity> {
    return this.productoSkuDatasource.deleteSku(id_sku);
  }
}
