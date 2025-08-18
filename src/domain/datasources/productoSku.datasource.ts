// src/datasources/producto-sku.datasource.ts

import { CreateProductoSkuDto } from "../dtos/producto/productoSku/create";
import { UpdateProductoSkuDto } from "../dtos/producto/productoSku/update";
import { ProductoSkuEntity } from "../entities/productoSku.entity";

export abstract class ProductoSkuDataSource {
  // CREATE
  abstract createSku(dto: CreateProductoSkuDto): Promise<ProductoSkuEntity>;

  // READ
  abstract getSkuById(id_sku: string): Promise<ProductoSkuEntity | null>;
  abstract getSkuByCode(sku_code: string): Promise<ProductoSkuEntity | null>;
  abstract getSkus(): Promise<ProductoSkuEntity[]>;
  abstract getSkusByProducto(id_producto: string): Promise<ProductoSkuEntity[]>;
  abstract getSkusByLoteTostado(id_lote_tostado: string): Promise<ProductoSkuEntity[]>;

  // UPDATE (datos no-stock)
  abstract updateSku(id_sku: string, dto: UpdateProductoSkuDto): Promise<ProductoSkuEntity>;
  abstract setSkuCode(id_sku: string, sku_code: string): Promise<ProductoSkuEntity>;

  // STOCK (usar desde use cases con validaciones)
  abstract incrementStock(id_sku: string, unidades: number): Promise<ProductoSkuEntity>;
  abstract decrementStock(id_sku: string, unidades: number): Promise<ProductoSkuEntity>;

  // Helper si necesitas buscar por combinación (sin unique compuesto)
  abstract findFirstByCombination( id_lote_tostado: string, gramaje: number, molienda: 'ENTERO' | 'MOLIDO' ): Promise<ProductoSkuEntity | null>;

  // DELETE (soft)
  abstract deleteSku(id_sku: string): Promise<ProductoSkuEntity>;
}
