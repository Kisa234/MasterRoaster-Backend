import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";
import { PaqueteItemRepository } from "../../repository/paquete-item.repository";

export interface GetEnviosPorEntidadUseCase {
    execute(entidad: string, id_entidad: string): Promise<EnvioEntity[]>;
}

export class GetEnviosPorEntidad implements GetEnviosPorEntidadUseCase {
    constructor(
        private readonly paqueteItemRepo: PaqueteItemRepository,
        private readonly envioRepo: EnvioRepository,
    ) { }

    async execute(entidad: string, id_entidad: string): Promise<EnvioEntity[]> {
        // 1. ¿En qué Paquetes aparece esta entidad? (puede estar en varios a lo largo
        //    del tiempo: un mismo lote puede haberse enviado en distintos despachos)
        const items = await this.paqueteItemRepo.getByEntidad(entidad, id_entidad);
        if (items.length === 0) return [];

        // 2. Dedupe de id_paquete — un paquete no debería repetir la misma entidad
        //    como item, pero no cuesta nada protegerse de eso igual.
        const idPaquetes = [...new Set(items.map(i => i.id_paquete))];

        // 3. De esos Paquetes, ¿cuáles ya tienen un Envio? (Paquete es 1:1 con Envio,
        //    pero puede no tener ninguno todavía si sigue EN_PREPARACION/LISTO)
        return this.envioRepo.getByPaquetes(idPaquetes);
    }
}