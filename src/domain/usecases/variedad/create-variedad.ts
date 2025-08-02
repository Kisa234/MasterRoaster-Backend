import { CreateVariedadDto } from "../../dtos/variedades/create";
import { VariedadEntity } from "../../entities/variedad.entity";
import { VariedadRepository } from "../../repository/variedad.repository";

export interface CreateVariedadUseCase {
    execute(data: CreateVariedadDto): Promise<VariedadEntity>;
};

export class CreateVariedad implements CreateVariedadUseCase {
    constructor(
        private readonly variedadRepository: VariedadRepository
    ){}

    async execute(data: CreateVariedadDto): Promise<VariedadEntity> {
        return this.variedadRepository.createVariedad(data);
    }
}