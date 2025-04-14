import { CreateLoteDto } from "../../dtos/lote/create";
import { UserRepository } from "../../repository/user.repository";
import { LoteRepository } from '../../repository/lote.repository';
import { LoteEntity } from "../../entities/lote.entity";


export interface CreateLoteFromMuestraUseCase {
    execute(id: string,peso:number): Promise<LoteEntity>;
}

export class CreateLoteFromMuestra implements CreateLoteFromMuestraUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute(id: string,peso:number): Promise<LoteEntity> {
        return this.loteRepository.createLoteFromMuestra(id,peso);
    }
}