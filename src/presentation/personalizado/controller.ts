import { Request, Response } from 'express';
import { PedidoRepository } from '../../domain/repository/pedido.repository';
import { TuesteRepository } from '../../domain/repository/tueste.repository';

export class PersonalizadoController {
  
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly tuesteRepository: TuesteRepository
  ) {}

  public getResumenTuesteLotePedido = async (req: Request, res: Response) => {        
      
      // Obtener todos los tuestes
      const tuestes = await this.tuesteRepository.getAllTuestes();
      if (!tuestes) return res.status(404).json({ message: 'No se encontraron tuestes' });

      let resumen:{
        id_pedido:      string,
        id_tueste:      string,
        id_lote:        string,
        fecha_tueste:   string,
        peso:           number,
        comentario:  string,
      }[]= []

      for (let tueste of tuestes) {
          const pedido = await this.pedidoRepository.getPedidoById(tueste.id_pedido);
          resumen.push({
              id_pedido: pedido!.id_pedido,
              id_tueste: tueste.id_tueste,
              id_lote: pedido!.id_lote,
              fecha_tueste: tueste.fecha_tueste.toLocaleDateString('es-ES'),
              peso: tueste.peso_entrada,
              comentario: pedido!.comentario
          });
      }

      return res.json(resumen);

  };      

}