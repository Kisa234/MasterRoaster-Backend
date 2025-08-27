// src/usecases/productoSku/upsert-producto-sku.usecase.ts

import { ProductoSkuRepository } from "../../../repository/productoSku.repository";
import { CreateProductoSkuDto } from "../../../dtos/producto/productoSku/create";
import { ProductoSkuEntity } from "../../../entities/productoSku.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";
import { UpdateLoteTostadoDto } from "../../../dtos/lotes/lote-tostado/update";

export interface UpsertProductoSkuUseCase {
  execute(dto: CreateProductoSkuDto): Promise<ProductoSkuEntity>;
}

export class UpsertProductoSku implements UpsertProductoSkuUseCase {
  constructor(
    private readonly skuRepository: ProductoSkuRepository,
    private readonly loteTostadoRepository: LoteTostadoRepository
  ) {}

  async execute(dto: CreateProductoSkuDto): Promise<ProductoSkuEntity> {

    // sku_code determinístico si no vino en el DTO
    const sku_code = dto.sku_code ?? buildSkuCode(dto.id_lote_tostado, dto.gramaje, dto.molienda);

    // 1) Buscar por sku_code
    let sku = await this.skuRepository.getSkuByCode(sku_code);

    // 2) no existe por code, buscar por combinación
    if (!sku) {
      sku = await this.skuRepository.findFirstByCombination(
        dto.id_lote_tostado, dto.gramaje, dto.molienda
      );
    }

    // 3) Actualizar peso lote tostado
    const loteTostado = await this.loteTostadoRepository.getLoteTostadoById(dto.id_lote_tostado);
    if(!loteTostado) throw new Error('no existe el lote tostado');
    const newPeso = loteTostado.peso - (dto.gramaje * (dto.cantidad? dto.cantidad : 0)) ;
    let eliminado = false;
    if( newPeso == 0){
      eliminado = true;
    }
    const [err,updateDto] = UpdateLoteTostadoDto.update({
      peso:newPeso,
      eliminado:eliminado
    })
    if (err) throw new Error(err);
    this.loteTostadoRepository.updateLoteTostado(dto.id_lote_tostado,updateDto!);

    // 4) Crear o incrementar
    if (!sku) {
      // Reuso tu DTO factory para no duplicar validaciones
      const [err, createDto] = CreateProductoSkuDto.create({
        id_producto: dto.id_producto,
        id_lote_tostado: dto.id_lote_tostado,
        gramaje: dto.gramaje,
        molienda: dto.molienda,
        cantidad: dto.cantidad,
        sku_code,
      });
      if (err) throw new Error(err);
      return this.skuRepository.createSku(createDto!);
    }

    // 5) Si existe: normaliza sku_code (si difiere) y suma stock
    if (!sku.sku_code || sku.sku_code !== sku_code) {
      await this.skuRepository.setSkuCode(sku.id_sku, sku_code);
    }
    return this.skuRepository.incrementStock(sku.id_sku, dto.cantidad!);
  }
}

function buildSkuCode(
  id_lote_tostado: string,
  gramaje: number,
  molienda: 'ENTERO' | 'MOLIDO'
) {
  const sufijo = molienda === 'ENTERO' ? 'ENT' : 'MOL';
  return `${id_lote_tostado}-${gramaje}-${sufijo}`;
}
