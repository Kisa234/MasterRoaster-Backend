import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const users = JSON.parse(fs.readFileSync('prisma/data/User.json', 'utf-8'));
    const analisisSensorial = JSON.parse(fs.readFileSync('prisma/data/AnalisisSensorial.json', 'utf-8'));
    const analisisFisico = JSON.parse(fs.readFileSync('prisma/data/AnalisisFisico.json', 'utf-8'));
    const analisis = JSON.parse(fs.readFileSync('prisma/data/Analisis.json', 'utf-8'));
    const lotes = JSON.parse(fs.readFileSync('prisma/data/Lote.json', 'utf-8'));
    const loteTostado = JSON.parse(fs.readFileSync('prisma/data/LoteTostado.json', 'utf-8'));
    const pedidos = JSON.parse(fs.readFileSync('prisma/data/Pedido.json', 'utf-8'));
    const tuestes = JSON.parse(fs.readFileSync('prisma/data/Tueste.json', 'utf-8'));
    const muestras = JSON.parse(fs.readFileSync('prisma/data/Muestra.json', 'utf-8'));

    await prisma.user.createMany({ data: users, skipDuplicates: true });
    await prisma.analisisSensorial.createMany({ data: analisisSensorial, skipDuplicates: true });
    await prisma.analisisFisico.createMany({ data: analisisFisico, skipDuplicates: true });
    await prisma.analisis.createMany({ data: analisis, skipDuplicates: true });
    await prisma.loteTostado.createMany({ data: loteTostado, skipDuplicates: true });
    await prisma.pedido.createMany({ data: pedidos, skipDuplicates: true });
    await prisma.tueste.createMany({ data: tuestes, skipDuplicates: true });
    await prisma.lote.createMany({ data: lotes.map((l: any) => ({
      ...l,
      variedades: parseVariedades(l.variedades)
    })), skipDuplicates: true });

    await prisma.muestra.createMany({ data: muestras.map((m: any) => ({
      ...m,
      variedades: parseVariedades(m.variedades)
    })), skipDuplicates: true });
}

function parseVariedades(raw: string | null) {
  if (!raw || !raw.startsWith("{")) return [];
  return raw.slice(1, -1).split(",");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});
