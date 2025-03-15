import { UpdateMuestraDto } from "../../dtos/muestra/update";
import { MuestraEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";

export interface UpdateMuestraUseCase {
    execute(id: string, updateMuestraDto: UpdateMuestraDto): Promise<MuestraEntity>;
}

export class UpdateMuestra implements UpdateMuestraUseCase {
    constructor(
        private readonly muestraRepository: MuestraRepository
    ){}

    async execute(id: string, updateMuestraDto: UpdateMuestraDto): Promise<MuestraEntity> {
        return this.muestraRepository.updateMuestra(id, updateMuestraDto);
    }
}