import { CreateLoteAnalisisDto } from './../../dtos/lote-analisis/create';
import { LoteAnalisisEntity } from "../../entities/lote-analisis";
import { LoteAnalisisRepository } from '../../repository/lote-analisis.repository';

export interface GetLoteAnalisisByLoteUseCase {
    execute(id:string): Promise<LoteAnalisisEntity[]>;
}

export class GetLoteAnalisisByLote implements GetLoteAnalisisByLoteUseCase {
    constructor(
        private readonly loteanalisisrepository: LoteAnalisisRepository ,
    ){}

    async execute(id:string): Promise<LoteAnalisisEntity[]> {
        return this.loteanalisisrepository.findByLote(id);
    }
}