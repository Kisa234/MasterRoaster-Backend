-- CreateTable
CREATE TABLE "PedidoBolsa" (
    "id_pedido_bolsa" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "gramaje" INTEGER NOT NULL,
    "molienda" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "PedidoBolsa_pkey" PRIMARY KEY ("id_pedido_bolsa")
);

-- AddForeignKey
ALTER TABLE "PedidoBolsa" ADD CONSTRAINT "PedidoBolsa_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;
