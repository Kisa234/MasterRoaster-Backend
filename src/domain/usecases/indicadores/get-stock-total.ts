import { LoteRepository } from '../../repository/lote.repository';
import { UserRepository } from '../../repository/user.repository';

export interface StockTotalResult {
  total: number;
  admin: number;
  cliente: number;
}

export interface GetStockTotalUseCase {
  execute(): Promise<StockTotalResult>;
}

export class GetStockTotal implements GetStockTotalUseCase {
  constructor(
    private readonly loteRepository: LoteRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(): Promise<StockTotalResult> {
    const lotes = await this.loteRepository.getLotes();
    const users = await this.userRepository.getAllUsers();

    const userMap = new Map<string, string>(); // id_user -> rol
    for (const user of users) {
      if (!user.eliminado) userMap.set(user.id_user, user.rol);
    }

    let total = 0;
    let totalAdmin = 0;
    let totalCliente = 0;

    for (const lote of lotes) {
      if (lote.eliminado) continue;

      const peso = lote.peso || 0;
      total += peso;

      // NOTA: igual que el bug original de clasificación — los lotes de tienda
      // (owned_by_store: true) tienen id_user null, así que nunca caen en
      // "admin" aquí. No truena (hay guard), pero totalAdmin queda incompleto.
      // Avísame si quieres que lo cambie a owned_by_store como en clasificación.
      const rol = lote.id_user ? userMap.get(lote.id_user) : null;
      if (rol === 'admin') {
        totalAdmin += peso;
      } else if (rol === 'cliente') {
        totalCliente += peso;
      }
    }

    return { total, admin: totalAdmin, cliente: totalCliente };
  }
}