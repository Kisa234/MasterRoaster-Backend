import { CreateLoteDto } from "../../../dtos/lotes/lote/create";
import { UserRepository } from "../../../repository/user.repository";
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";


export interface CreateLoteUseCase {
    execute(createLoteDto: CreateLoteDto): Promise<LoteEntity>;
}

export class CreateLote implements CreateLoteUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute( createLoteDto: CreateLoteDto): Promise<LoteEntity> {
        return this.loteRepository.createLote(createLoteDto);
    }
}