import { Request, Response } from 'express';
import { PedidoRepository } from '../../domain/repository/pedido.repository';
import { TuesteRepository } from '../../domain/repository/tueste.repository';
import { LoteRepository } from '../../domain/repository/lote.repository';
import { UserRepository } from '../../domain/repository/user.repository';

export class PersonalizadoController {

  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly tuesteRepository: TuesteRepository,
    private readonly loteRepository: LoteRepository,
    private readonly userRepository: UserRepository
  ) { }

  public getResumenTuesteLotePedido = async (req: Request, res: Response) => {

    // Obtener todos los tuestes
    const tuestes = await this.tuesteRepository.getAllTuestes();
    if (!tuestes) return res.status(404).json({ message: 'No se encontraron tuestes' });

    let resumen: {

      id_pedido: string,
      id_tueste: string,
      id_lote: string,
      fecha_tueste: string,
      peso: number,
      comentario: string,
    }[] = []

    for (let tueste of tuestes) {
      const pedido = await this.pedidoRepository.getPedidoById(tueste.id_pedido);
      resumen.push({
        id_pedido: pedido!.id_pedido,
        id_tueste: tueste.id_tueste,
        id_lote: pedido!.id_lote,
        fecha_tueste: tueste.fecha_tueste.toLocaleDateString('es-ES'),
        peso: tueste.peso_entrada,
        comentario: pedido!.comentario!
      });
    }

    return res.json(resumen);

  };

  public getTuestesPendientes = async (req: Request, res: Response) => {
    try {
      const pedidos = await this.pedidoRepository.getAllPedidos();

      const pendientes = pedidos.filter(p =>
        p.estado_pedido !== 'Completado' && !p.eliminado
      );

      return res.json(pendientes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener tuestes pendientes' });
    }
  };

  public getUltimosPedidos = async (req: Request, res: Response) => {
    try {
      const pedidos = await this.pedidoRepository.getHistoricoPedidos();

      const ultimos = pedidos
        .sort((a, b) =>
          new Date(b.fecha_registro).getTime() - new Date(a.fecha_registro).getTime()
        )
        .filter(p => !p.tipo_pedido.includes('Orden Tueste'))
        .slice(0, 5);

      return res.json(ultimos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener últimos pedidos' });
    }
  };

  public getStockTotal = async (req: Request, res: Response) => {
    try {
      const lotes = await this.loteRepository.getLotes();
      const users = await this.userRepository.getAllUsers();

      // Crear un mapa de usuarios para acceso rápido por id_user
      const userMap = new Map<string, string>(); // id_user -> rol
      for (const user of users) {
        if (!user.eliminado) {
          userMap.set(user.id_user, user.rol);
        }
      }

      let total = 0;
      let totalAdmin = 0;
      let totalCliente = 0;

      for (const lote of lotes) {
        if (lote.eliminado) continue;

        const peso = lote.peso || 0;

        // Contabilizar en total general
        total += peso;

        const rol = lote.id_user ? userMap.get(lote.id_user) : null;
        if (rol === 'admin') {
          totalAdmin += peso;
        } else if (rol === 'cliente') {
          totalCliente += peso;
        }
      }

      return res.json({
        total,
        admin: totalAdmin,
        cliente: totalCliente
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al calcular stock total' });
    }
  };

  public getPesoPorClasificacion = async (req: Request, res: Response) => {
    try {
      const lotes = await this.loteRepository.getLotes();
      if (!lotes || lotes.length === 0) {
        return res.status(404).json({ message: 'No se encontraron lotes' });
      }

      const clasificaciones = ['Selecto', 'Clasico', 'Exclusivo', 'Especial'];
      const pesoPorClasificacion: Record<string, number> = {};

      // Inicializar todas las clasificaciones en 0
      for (const c of clasificaciones) {
        pesoPorClasificacion[c] = 0;
      }
      pesoPorClasificacion['Otros'] = 0;

      for (const lote of lotes) {
        if (lote.eliminado) continue;
        const peso = lote.peso ?? 0;
        const clasificacion = lote.clasificacion?.toLowerCase() ?? '';

        // Buscar coincidencia ignorando mayúsculas/minúsculas
        const matched = clasificaciones.find(c => c.toLowerCase() === clasificacion);
        if (matched) {
          pesoPorClasificacion[matched] += peso;
        } else {
          pesoPorClasificacion['Otros'] += peso;
        }
      }

      return res.json(pesoPorClasificacion);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al calcular peso por clasificación' });
    }
  };

}

