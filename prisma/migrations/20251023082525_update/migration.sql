-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE SET NULL ON UPDATE CASCADE;
