import { MuestraEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";

export interface DeleteMuestraUseCase {
    execute(id: string): Promise<MuestraEntity>;
}

export class DeleteMuestra implements DeleteMuestraUseCase {
    constructor(
        private readonly muestraRepository: MuestraRepository
    ){}

    async execute(id: string): Promise<MuestraEntity> {
        return this.muestraRepository.deleteMuestra(id);
    }
}