import { CreateLoteAnalisisDto } from './../../dtos/lote-analisis/create';
import { LoteAnalisisEntity } from "../../entities/lote-analisis";
import { LoteAnalisisRepository } from '../../repository/lote-analisis.repository';

export interface CreateLoteAnalisisUseCase {
    execute(createLoteAnalisisDto:CreateLoteAnalisisDto): Promise<LoteAnalisisEntity>;
}

export class CreateLoteAnalisis implements CreateLoteAnalisisUseCase {
    constructor(
        private readonly loteanalisisrepository: LoteAnalisisRepository ,
    ){}

    async execute(createLoteAnalisisDto:CreateLoteAnalisisDto): Promise<LoteAnalisisEntity> {
        return this.loteanalisisrepository.create(createLoteAnalisisDto);
    }
}