import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisFisicoRepository } from '../../../repository/analisisFisico.repository';


export interface GetAllAnalisisFisicoUseCase {
    execute(): Promise<AnalisisFisicoEntity[] | null>;
}

export class GetAllAnalisisFisico implements GetAllAnalisisFisicoUseCase {
    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository
    ){}

    async execute(): Promise<AnalisisFisicoEntity[] | null> {
        return this.analisisFisicoRepository.getAllAnalisisFisico();
    }
}