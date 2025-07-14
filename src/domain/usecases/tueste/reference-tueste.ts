import { Lote } from "@prisma/client";
import { CreateTuesteDto } from "../../dtos/tueste/create";
import { TuesteEntity } from "../../entities/tueste.entity";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { LoteRepository } from "../../repository/lote.repository";
import { AvgTuesteEntity } from "../../entities/average-tueste.entity";

export interface GetReferenceTuesteUseCase {
    execute(id_lote: string): Promise<AvgTuesteEntity>;
}


export class GetReferenceTueste implements GetReferenceTuesteUseCase {
  constructor(
    private readonly tuesteRepository: TuesteRepository,
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async execute(id_lote: string): Promise<AvgTuesteEntity> {
    console.log("ID LOTE", id_lote);
    const pedidos = await this.pedidoRepository.getPedidosByLote(id_lote);
    if (!pedidos?.length) {
      throw new Error(`No se encontraron pedidos para el lote ${id_lote}`);
    }

    
    const roastArrays = await Promise.all(
      pedidos.map(p => this.tuesteRepository.getTostadosByPedido(p.id_pedido))
    );
    
    const allRoasts = roastArrays.flat();
    if (!allRoasts.length) {
      throw new Error(`No hay tuestes para los pedidos del lote ${id_lote}`);
    }

    // Helper inline para promediar cualquier campo numérico
    const avg = (field: keyof TuesteEntity): number => {
      let sum = 0;
      let count = 0;
      for (const r of allRoasts) {
        const v = r[field] as number | null | undefined;
        if (v != null) {
          sum += v;
          count++;
        }
      }
      return count ? sum / count : 0;
    };

    // Generamos el tueste de referencia usando avg()
    const referenceRoast: AvgTuesteEntity = {
      temperatura_entrada:          avg('temperatura_entrada'),
      llama_inicial:                avg('llama_inicial'),
      aire_inicial:                 avg('aire_inicial'),
      punto_no_retorno:             avg('punto_no_retorno'),
      tiempo_despues_crack:         avg('tiempo_despues_crack'),
      temperatura_crack:            avg('temperatura_crack'),
      temperatura_salida:           avg('temperatura_salida'),
      tiempo_total:                 avg('tiempo_total'),
      porcentaje_caramelizacion:    avg('porcentaje_caramelizacion'),
      desarrollo:                   avg('desarrollo'),
      grados_desarrollo:            avg('grados_desarrollo'),
    };

    return referenceRoast;
  }
}
