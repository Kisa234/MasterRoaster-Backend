import { CreateVariedadDto } from "../../dtos/variedades/create";
import { VariedadEntity } from "../../entities/variedad.entity";
import { VariedadRepository } from "../../repository/variedad.repository";

export interface DeleteVariedadUseCase {
    execute(id_variedad: string): Promise<VariedadEntity>;
};

export class DeleteVariedad implements DeleteVariedadUseCase {
    constructor(
        private readonly variedadRepository: VariedadRepository
    ){}

    async execute(id_variedad: string): Promise<VariedadEntity> {
        return this.variedadRepository.deleteVariedad(id_variedad);
    }
}