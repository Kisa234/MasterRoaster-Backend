import { CreateLoteAnalisisDto } from './../../dtos/lote-analisis/create';
import { LoteAnalisisEntity } from "../../entities/lote-analisis";
import { LoteAnalisisRepository } from '../../repository/lote-analisis.repository';

export interface GetLoteAnalisisByAnalisisUseCase {
    execute(id:string): Promise<LoteAnalisisEntity[]>;
}

export class GetLoteAnalisisByAnalisis implements GetLoteAnalisisByAnalisisUseCase {
    constructor(
        private readonly loteanalisisrepository: LoteAnalisisRepository ,
    ){}

    async execute(id:string): Promise<LoteAnalisisEntity[]> {
        return this.loteanalisisrepository.findByAnalisis(id);
    }
}