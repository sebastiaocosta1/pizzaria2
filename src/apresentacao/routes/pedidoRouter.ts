import express from "express";
import PedidoController from "../../aplicacao/controllers/PedidoController";
import PedidoRepository from "../../dominio/repositories/PedidoRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";

const router = express.Router();

const pedidoRepository = new PedidoRepository(
    AppDataSource.getRepository("Pedido")
);

const pedidoController = new PedidoController(pedidoRepository);

router.post("/", pedidoController.criaPedido.bind(pedidoController));
router.get("/", pedidoController.listaPedidos.bind(pedidoController));
router.get("/:id", pedidoController.listaPedido.bind(pedidoController));
router.put("/:id", pedidoController.atualizaPedido.bind(pedidoController));
router.delete("/:id", pedidoController.deletaPedido.bind(pedidoController));

export default router;
