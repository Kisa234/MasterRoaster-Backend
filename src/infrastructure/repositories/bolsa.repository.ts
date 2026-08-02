import { BolsaDataSource } from "../../domain/datasources/bolsa.datasource";
import { CreateBolsaDto } from "../../domain/dtos/bolsa/create";
import { UpdateBolsaDto } from "../../domain/dtos/bolsa/update";
import { BolsaConInventarioEntity, BolsaEntity } from "../../domain/entities/bolsa.entity";
import { BolsaRepository } from "../../domain/repository/bolsa.repository";

export class BolsaRepositoryImpl implements BolsaRepository {
    constructor(
        private readonly datasource: BolsaDataSource
    ) { }

    createBolsa(id_bolsa: string, createBolsaDto: CreateBolsaDto): Promise<BolsaEntity> {
        return this.datasource.createBolsa(id_bolsa, createBolsaDto);
    }
    countBolsasByLoteTostadoId(id_lote_tostado: string): Promise<number> {
        return this.datasource.countBolsasByLoteTostadoId(id_lote_tostado);
    }
    getBolsaById(id: string): Promise<BolsaEntity | null> {
        return this.datasource.getBolsaById(id);
    }
    updateBolsa(id: string, updateBolsaDto: UpdateBolsaDto): Promise<BolsaEntity> {
        return this.datasource.updateBolsa(id, updateBolsaDto);
    }
    deleteBolsa(id: string): Promise<BolsaEntity> {
        return this.datasource.deleteBolsa(id);
    }
    getBolsas(): Promise<BolsaEntity[]> {
        return this.datasource.getBolsas();
    }
    getBolsasByPedidoId(id_pedido: string): Promise<BolsaEntity[]> {
        return this.datasource.getBolsasByPedidoId(id_pedido);
    }
    getBolsasByLoteTostadoId(id_lote_tostado: string): Promise<BolsaEntity[]> {
        return this.datasource.getBolsasByLoteTostadoId(id_lote_tostado);
    }
    getBolsasConInventario(incluirEliminados: boolean): Promise<BolsaConInventarioEntity[]> {
        return this.datasource.getBolsasConInventario(incluirEliminados);
    }
    getBolsaConInventarioById(id: string): Promise<BolsaConInventarioEntity | null> {
        return this.datasource.getBolsaConInventarioById(id);
    }
    countBolsasByLoteTostadoGramajeMolienda(id_lote_tostado: string, gramaje: number, molienda: string): Promise<number> {
        return this.datasource.countBolsasByLoteTostadoGramajeMolienda(id_lote_tostado, gramaje, molienda);
    }
}