import { LoteAnalisisDatasource } from "../../domain/datasources/lore-analisis.datasource";
import { CreateLoteAnalisisDto } from "../../domain/dtos/lote-analisis/create";
import { LoteAnalisisEntity } from "../../domain/entities/lote-analisis";
import { LoteAnalisisRepository } from "../../domain/repository/lote-analisis.repository";

export class LoteAnalisisRepositoryImpl implements LoteAnalisisRepository{
    constructor(
        private readonly loteAnalisisDatasource: LoteAnalisisDatasource
    ){}

    create(data: CreateLoteAnalisisDto): Promise<LoteAnalisisEntity> {
        return this.loteAnalisisDatasource.create(data);
    }
    findByLote(id_lote: string): Promise<LoteAnalisisEntity[]> {
        return this.loteAnalisisDatasource.findByLote(id_lote);
    }
    findByAnalisis(id_analisis: string): Promise<LoteAnalisisEntity[]> {
        return this.loteAnalisisDatasource.findByAnalisis(id_analisis);
    }

} 