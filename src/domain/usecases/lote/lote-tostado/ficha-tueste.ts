import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";
import { TuesteRepository } from '../../../repository/tueste.repository';
import { PedidoRepository } from '../../../repository/pedido.repository';
import { FichaTueste } from "../../../entities/ficha-tueste.entity";

export interface FichaTuesteUseCase {
    execute(id: string): Promise<FichaTueste | null>; 
}

export class GetFichaTueste implements FichaTuesteUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository,
        private readonly tuesteRepository: TuesteRepository,
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(id: string): Promise<FichaTueste | null> {
        const loteTostado = await this.loteTostadoRepository.getLoteTostadoById(id);
        const tuestes = await this.tuesteRepository.getTostadosByLoteTostado(id);
        if (!loteTostado || tuestes.length === 0) {
            return null; 
        }

        const id_lote =loteTostado.id_lote;
        const humedad = tuestes.reduce((total, t) => total + (t.humedad ?? 0), 0) / tuestes.length;
        const densidad = tuestes.reduce((total, t) => total + (t.densidad ?? 0), 0) / tuestes.length;
        const caramelizacion = tuestes.reduce((total, t) => total + (t.porcentaje_caramelizacion ?? 0), 0) / tuestes.length;
        const desarrollo = tuestes.reduce((total, t) => total + (t.desarrollo ?? 0), 0) / tuestes.length;
        const agtrom = tuestes.reduce((total, t) => total + (t.agtrom_comercial ?? 0), 0) / tuestes.length;
        const temp_desarrollo = tuestes.reduce((total, t) => total + (t.grados_desarrollo ?? 0), 0) / tuestes.length;
        const tiempo = tuestes.reduce((total, t) => total + (t.tiempo_total ?? 0), 0) / tuestes.length;
        const tueste = loteTostado.perfil_tostado;
        const id_lote_tostado = loteTostado.id_lote_tostado;
        const pesoTotal = tuestes.reduce((total, t) => total + (t.peso_salida ?? 0), 0);
        

        return new FichaTueste(
            id_lote,
            humedad,
            densidad,
            caramelizacion,
            desarrollo,
            temp_desarrollo,
            agtrom,
            tiempo,
            tueste,
            id_lote_tostado,
            pesoTotal
        )
    }
}