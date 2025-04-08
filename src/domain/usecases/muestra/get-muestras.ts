import { MuestraEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";

export interface GetMuestrasUseCase {
    execute(): Promise<MuestraEntity[] | null>;
}

export class GetMuestras implements GetMuestrasUseCase {
    constructor(
        private readonly muestraRepository: MuestraRepository
    ){}

    async execute(): Promise<MuestraEntity[] | null> {
        return this.muestraRepository.getMuestras();
    }
}