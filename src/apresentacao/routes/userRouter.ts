import express from "express";
import UserController from "../../aplicacao/controllers/UserController";
import UserRepository from "../../dominio/repositories/UserRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";

const router = express.Router();

const userRepository = new UserRepository(
    AppDataSource.getRepository("Usuario")
)

const userController = new UserController(userRepository);

router.post("/", userController.criaUsuario.bind(userController));
router.get("/", userController.listaUsuarios.bind(userController));
router.get("/:id", userController.listaUsuario.bind(userController));
router.put("/:id", userController.atualizaUsuario.bind(userController));
router.delete("/:id", userController.deletaUsuario.bind(userController));

export default router;
