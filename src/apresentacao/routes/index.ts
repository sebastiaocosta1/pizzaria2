import express from "express";
import userRouter from "../routes/userRouter";
import cupomDescontoRouter from "../routes/cupomDescontoRouter";
import enderecoRouter from "../routes/enderecoRouter";
import produtoRouter from "../routes/produtoRouter";
import clienteRouter from "../routes/clienteRoutes";
import adminstradorRouter from "../routes/administradorRouter";
import pedidoRouter from "../routes/pedidoRouter";

const router = (app: express.Router) => {
  app.use("/users", userRouter);
  app.use("/cupons", cupomDescontoRouter);
  app.use("/enderecos", enderecoRouter);
  app.use("/produtos", produtoRouter);
  app.use("/clientes", clienteRouter);
  app.use("/administradores", adminstradorRouter);
  app.use("/pedidos", pedidoRouter);

};

export default router;
