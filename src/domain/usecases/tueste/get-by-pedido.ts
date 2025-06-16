import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface GetTostadosByPedidoUseCase {
    execute(id:string): Promise<TuesteEntity[]>;
}

export class GetTostadosByPedido implements GetTostadosByPedidoUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository
    ){}

    async execute(id:string): Promise<TuesteEntity[]> {
        return this.tuesteRepository.getTostadosByPedido(id);
    }
}
