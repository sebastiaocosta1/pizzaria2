import express, { Response } from "express";
import router from "./apresentacao/routes";
import { AppDataSource } from "./infraestrutura/config/dataSource";
import cors = require("cors");

const corsOptions = {
  origin: ["http://127.0.0.1:5500"], 
  methods: ["GET", "POST", "PUT", "DELETE"],             
  allowedHeaders: ["Content-Type", "Authorization"],    
  credentials: true                                      
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
router(app);

AppDataSource.initialize().then( () => {
  console.log("Banco de dados conecetado")
})
.catch((erro) => {
  console.log(erro);
})


export default app;
