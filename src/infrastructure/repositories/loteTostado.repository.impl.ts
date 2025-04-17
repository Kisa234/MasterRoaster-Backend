import { LoteTostadoDataSource } from "../../domain/datasources/loteTostado.datasource";
import { CreateLoteTostadoDto } from "../../domain/dtos/lotes/lote-tostado/create";
import { UpdateLoteTostadoDto } from "../../domain/dtos/lotes/lote-tostado/update";
import { LoteTostadoEntity } from "../../domain/entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../domain/repository/loteTostado.repository";


export class LoteTostadoRepositoryImpl implements LoteTostadoRepository {

    constructor(
        private readonly datasource: LoteTostadoDataSource
    ) {}

    createLoteTostado(createLoteTostadoDto: CreateLoteTostadoDto): Promise<LoteTostadoEntity> {
        return this.datasource.createLoteTostado(createLoteTostadoDto);
    }
    getLoteTostadoById(id: string): Promise<LoteTostadoEntity | null> {
        return this.datasource.getLoteTostadoById(id);
    }
    updateLoteTostado(id: string, updateLoteTostadoDto: UpdateLoteTostadoDto): Promise<LoteTostadoEntity> {
        return this.datasource.updateLoteTostado(id, updateLoteTostadoDto);
    }
    deleteLoteTostado(id: string): Promise<LoteTostadoEntity> {
        return this.datasource.deleteLoteTostado(id);
    }
    getLoteTostados(): Promise<LoteTostadoEntity[]> {
        return this.datasource.getLoteTostados();
    }
    getLotesTostadoByLoteId(id: string): Promise<LoteTostadoEntity[]> {
        return this.datasource.getLotesTostadoByLoteId(id);
    }
    
    
}