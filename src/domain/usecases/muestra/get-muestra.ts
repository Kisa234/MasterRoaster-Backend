import { MuestraEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";

export interface GetMuestraUseCase {
    execute(id: string): Promise<MuestraEntity | null>;
}

export class GetMuestra implements GetMuestraUseCase {
    constructor(
        private readonly muestraRepository: MuestraRepository
    ){}

    async execute(id: string): Promise<MuestraEntity | null> {
        return this.muestraRepository.getMuestraById(id);
    }
}