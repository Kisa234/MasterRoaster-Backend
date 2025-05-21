import { LoteDataSource } from "../../domain/datasources/lote.datasource";
import { CreateLoteDto } from "../../domain/dtos/lotes/lote/create";
import { UpdateLoteDto } from "../../domain/dtos/lotes/lote/update";
import { LoteEntity } from "../../domain/entities/lote.entity";
import { LoteRepository } from "../../domain/repository/lote.repository";

export class LoteRepositoryImpl  implements LoteRepository {
    constructor(
        private readonly datasource: LoteDataSource
    ){}

    createLote(createLoteDto: CreateLoteDto): Promise<LoteEntity> {
        
        return this.datasource.createLote(createLoteDto);
    }
    getLoteById(id: string): Promise<LoteEntity | null> {
        return this.datasource.getLoteById(id);
    }
    updateLote(id: string, updateLoteDto: UpdateLoteDto): Promise<LoteEntity> {
        return this.datasource.updateLote(id, updateLoteDto);
    }
    deleteLote(id: string): Promise<LoteEntity> {
        return this.datasource.deleteLote(id);
    }
    getLotes(): Promise<LoteEntity[]> {
        return this.datasource.getLotes();
    }
    createLoteFromMuestra(id: string, peso: number, dto:CreateLoteDto): Promise<LoteEntity> {
        return this.datasource.createLoteFromMuestra(id, peso,dto);
    }
    getLotesByUserId(id: string): Promise<LoteEntity[]> {
        return this.datasource.getLotesByUserId(id);
    }
    getLotesTostados(): Promise<LoteEntity[]>{
        return this.datasource.getLotesTostados();
    }
    getLotesVerdes(): Promise<LoteEntity[]>{
        return this.datasource.getLotesVerdes();
    }


}