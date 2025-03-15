import { UpdateAnalisisRapidoDto } from "../../../dtos/analisis/rapido/update";
import { AnalisisRapidoEntity } from "../../../entities/analisisRapido.entity";
import { AnalisisRapidoRepository } from "../../../repository/analisisRapido.repository";




export interface UpdateAnalisisRapidoUseCase {
    execute(id: string, updateAnalisisRapidoDto:UpdateAnalisisRapidoDto ): Promise<AnalisisRapidoEntity>;
}

export class UpdateAnalisisRapido implements UpdateAnalisisRapidoUseCase {
    constructor(
        private readonly analisisRapidoRepository: AnalisisRapidoRepository
    ){}

    async execute(id: string,  updateAnalisisRapidoDto:UpdateAnalisisRapidoDto ): Promise<AnalisisRapidoEntity> {
        return this.analisisRapidoRepository.updateAnalisisRapido(id, updateAnalisisRapidoDto);
    }
}
