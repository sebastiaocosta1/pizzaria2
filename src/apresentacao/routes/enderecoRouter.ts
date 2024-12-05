import express from "express";
import EnderecoController from "../../aplicacao/controllers/EnderecoController";
import EnderecoRepository from "../../dominio/repositories/EnderecoRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";

const router = express.Router();

const enderecoRepository = new EnderecoRepository(
    AppDataSource.getRepository("Endereco")
);

const enderecoController = new EnderecoController(enderecoRepository);

router.post("/", enderecoController.criaEndereco.bind(enderecoController));
router.get("/", enderecoController.listaEnderecos.bind(enderecoController));
router.get("/:id", enderecoController.listaEndereco.bind(enderecoController));
router.put("/:id", enderecoController.atualizaEndereco.bind(enderecoController));
// router.delete("/:id", enderecoController.deletaEndereco.bind(enderecoController));

export default router;
