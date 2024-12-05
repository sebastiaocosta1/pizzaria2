import express from "express";
import ClienteController from "../../aplicacao/controllers/ClienteController";
import ClienteRepository from "../../dominio/repositories/ClienteRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";

const router = express.Router();

const clienteRepository = new ClienteRepository(
    AppDataSource.getRepository("Cliente")
);

const clienteController = new ClienteController(clienteRepository);

router.post("/", clienteController.criaCliente.bind(clienteController));
router.get("/", clienteController.listaClientes.bind(clienteController));
router.get("/:id", clienteController.listaCliente.bind(clienteController));
router.put("/:id", clienteController.atualizaCliente.bind(clienteController));
// router.delete("/:id", clienteController.deletaCliente.bind(clienteController));

export default router;
