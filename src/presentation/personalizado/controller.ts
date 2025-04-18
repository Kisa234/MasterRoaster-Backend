import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

export class PersonalizadoController {
  
  constructor() {}

  public getResumenTuesteLotePedido = async (req: Request, res: Response) => {
        try {
              const pedidos =  await prisma.pedido.findMany({
                 where: {
                     eliminado: false,
                 }
              });

              const tuestes = await prisma.tueste.findMany({
                 where: {
                     eliminado: false,
                     estado_tueste: 'Pendiente'
                 }
              });

              let resumen:{
                id_pedido:      string,
                id_tueste:      string,
                id_lote:        string,
                fecha_tueste:   Date,
                peso:           number,
                observaciones:  string,
              }[]= []
              
              const a = pedidos.map( pedido =>{
                const tueste = tuestes.find(tueste => tueste.id_pedido === pedido.id_pedido);
                  resumen.push( {
                    id_pedido: pedido.id_pedido,
                    id_tueste: tueste!.id_tueste,
                    id_lote: pedido.id_lote,
                    fecha_tueste: tueste!.fecha_tueste,
                    peso: tueste!.peso_entrada,
                    observaciones: pedido.observaciones,
                  })
              })
              

          
        } catch (err) {
          res.status(500).json({ error: 'Error obteniendo datos' });
        }
  };      

}