import { DataSource } from "typeorm";
import { Usuario } from "../../dominio/entities/UsuarioEntity";
import { Cliente } from "../../dominio/entities/ClienteEntity";
import { Endereco } from "../../dominio/entities/EnderecoEntity";
import { Pedido } from "../../dominio/entities/PedidoEntity";
import { CupomDesconto } from "../../dominio/entities/CupomDescontoEntity";
import { Produto } from "../../dominio/entities/ProdutoEntity";
import { Administrador } from "../../dominio/entities/AdministradorEntity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "aluno",
    database: "pizzaria",
    entities: [Usuario, Endereco, Pedido, CupomDesconto, Produto, Cliente, Administrador],
    synchronize: true, 
    logging: false,
});

