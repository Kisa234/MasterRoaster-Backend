import { Request, Response } from 'express';
import { PedidoRepository } from '../../domain/repository/pedido.repository';
import { TuesteRepository } from '../../domain/repository/tueste.repository';
import { LoteRepository } from '../../domain/repository/lote.repository';
import { UserRepository } from '../../domain/repository/user.repository';
import { GetLoteInventario } from '../../domain/usecases/lote/lote/get-lote-inventario';

import { GetResumenTuesteLotePedido } from '../../domain/usecases/indicadores/get-resumen-tueste-lote-pedido';
import { GetTuestesPendientes } from '../../domain/usecases/indicadores/get-tuestes-pendientes';
import { GetUltimosPedidos } from '../../domain/usecases/indicadores/get-ultimos-pedidos';
import { GetStockTotal } from '../../domain/usecases/indicadores/get-stock-total';
import { GetStockClasificacion } from '../../domain/usecases/indicadores/get-stock-clasificacion';

export class PersonalizadoController {

  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly tuesteRepository: TuesteRepository,
    private readonly loteRepository: LoteRepository,
    private readonly userRepository: UserRepository,
    private readonly getLoteInventarioUseCase: GetLoteInventario,
  ) { }

  public getResumenTuesteLotePedido = async (req: Request, res: Response) => {
    new GetResumenTuesteLotePedido(this.tuesteRepository, this.pedidoRepository)
      .execute()
      .then(resumen => res.json(resumen))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getTuestesPendientes = async (req: Request, res: Response) => {
    new GetTuestesPendientes(this.pedidoRepository)
      .execute()
      .then(pendientes => res.json(pendientes))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getUltimosPedidos = async (req: Request, res: Response) => {
    new GetUltimosPedidos(this.pedidoRepository)
      .execute()
      .then(ultimos => res.json(ultimos))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getStockTotal = async (req: Request, res: Response) => {
    new GetStockTotal(this.loteRepository, this.userRepository)
      .execute()
      .then(stock => res.json(stock))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getPesoPorClasificacion = async (req: Request, res: Response) => {
    new GetStockClasificacion(this.getLoteInventarioUseCase)
      .execute()
      .then(resultado => res.json(resultado))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };
}