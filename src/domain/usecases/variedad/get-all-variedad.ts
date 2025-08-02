import { CreateVariedadDto } from "../../dtos/variedades/create";
import { VariedadEntity } from "../../entities/variedad.entity";
import { VariedadRepository } from "../../repository/variedad.repository";

export interface GetAllVariedadUseCase {
    execute(): Promise<VariedadEntity[]>;
};

export class GetAllVariedad implements GetAllVariedadUseCase {
    constructor(
        private readonly variedadRepository: VariedadRepository
    ){}

    async execute(): Promise<VariedadEntity[]> {
        return this.variedadRepository.getAllVariedades();
    }
}