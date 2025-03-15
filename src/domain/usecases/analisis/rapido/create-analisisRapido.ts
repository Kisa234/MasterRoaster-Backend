import { CreateAnalisisRapidoDto } from "../../../dtos/analisis/rapido/create";
import { AnalisisRapidoEntity } from "../../../entities/analisisRapido.entity";
import { AnalisisRapidoRepository } from '../../../repository/analisisRapido.repository';

export interface CreateAnalisisRapidoUseCase {
    execute(createAnalisisRapidoDto: CreateAnalisisRapidoDto): Promise<AnalisisRapidoEntity>;
}

export class CreateAnalisisRapido implements CreateAnalisisRapidoUseCase {
    constructor(
        private readonly AnalisisRapidoRepository: AnalisisRapidoRepository
    ){}

    async execute(createAnalisisRapidoDto: CreateAnalisisRapidoDto): Promise<AnalisisRapidoEntity> {
        return this.AnalisisRapidoRepository.createAnalisisRapido(createAnalisisRapidoDto);
    }
}
