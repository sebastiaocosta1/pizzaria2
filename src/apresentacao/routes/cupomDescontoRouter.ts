import express from "express";
import CupomDescontoController from "../../aplicacao/controllers/CupomDescontoController";
import CupomDescontoRepository from "../../dominio/repositories/CupomDescontoRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";

const router = express.Router();

const cupomDescontoRepository = new CupomDescontoRepository(
    AppDataSource.getRepository("CupomDesconto")
)

const cupomDescontoController = new CupomDescontoController(cupomDescontoRepository);

router.post("/", cupomDescontoController.criaCupomDesconto.bind(cupomDescontoController));
router.get("/", cupomDescontoController.listaCuponsDesconto.bind(cupomDescontoController));
router.get("/:id", cupomDescontoController.atualizaCupomDesconto.bind(cupomDescontoController));
router.put("/:id", cupomDescontoController.listaCupomDesconto.bind(cupomDescontoController));
router.put("/:id", cupomDescontoController.deletaCupomDesconto.bind(cupomDescontoController));

export default router;
