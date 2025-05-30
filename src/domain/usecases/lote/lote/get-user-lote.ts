
import { LoteRepository } from '../../../repository/lote.repository';

export interface GetUserByLoteUseCase {
    execute(id:string): Promise<string>;
}

export class GetUserByLote implements GetUserByLoteUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute(id:string): Promise<string> {
        return this.loteRepository.getUserByLote(id);
    }
}