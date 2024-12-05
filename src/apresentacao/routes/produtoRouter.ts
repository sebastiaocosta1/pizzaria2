import express from "express";
import ProdutoController from "../../aplicacao/controllers/ProdutoController";
import ProdutoRepository from "../../dominio/repositories/ProdutoRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";

const router = express.Router();

const produtoRepository = new ProdutoRepository(
    AppDataSource.getRepository("Produto")
);

const produtoController = new ProdutoController(produtoRepository);

router.post("/", produtoController.criaProduto.bind(produtoController));
router.get("/", produtoController.listaProdutos.bind(produtoController));
router.get("/:id", produtoController.listaProduto.bind(produtoController));
router.put("/:id", produtoController.atualizaProduto.bind(produtoController));
// router.delete("/:id", produtoController.excluiProduto.bind(produtoController));

export default router;
