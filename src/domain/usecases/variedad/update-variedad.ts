import { CreateVariedadDto } from "../../dtos/variedades/create";
import { UpdateVariedadDto } from "../../dtos/variedades/update";
import { VariedadEntity } from "../../entities/variedad.entity";
import { VariedadRepository } from "../../repository/variedad.repository";

export interface UpdateVariedadUseCase {
    execute(id: string, data: UpdateVariedadDto): Promise<VariedadEntity | null>;
};

export class UpdateVariedad implements UpdateVariedadUseCase {
    constructor(
        private readonly variedadRepository: VariedadRepository
    ) { }


    async execute(id: string, data: UpdateVariedadDto): Promise<VariedadEntity | null> {
        return this.variedadRepository.updateVariedad(id, data);
    }

}