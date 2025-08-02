import { CreateVariedadDto } from "../../dtos/variedades/create";
import { VariedadEntity } from "../../entities/variedad.entity";
import { VariedadRepository } from "../../repository/variedad.repository";

export interface GetVariedadByNombreUseCase {
    execute(nombre: string): Promise<VariedadEntity | null>;
};

export class GetVariedadByNombre implements GetVariedadByNombreUseCase {
    constructor(
        private readonly variedadRepository: VariedadRepository
    ){}

    async execute(nombre: string): Promise<VariedadEntity | null> {
        return this.variedadRepository.findByNombre(nombre);
    }
}