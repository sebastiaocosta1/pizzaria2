import { Request, Response } from "express";
import { Cliente } from "../../dominio/entities/ClienteEntity";
import InterfaceClienteRepository from "../../dominio/repositories/interfaces/InterfaceClienteRepository";

export default class ClienteController {
    constructor(private repository: InterfaceClienteRepository) {}

    async criaCliente(req: Request, res: Response): Promise<void> {

        try {
            console.log(req.body)

            const { ultimo_pedido, endereco, usuario} = <Cliente>req.body;
            
            if (!ultimo_pedido || !endereco || !usuario) {
                res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
                return;
            }

            const novoCliente = new Cliente(
                ultimo_pedido,
                endereco,
                usuario
            );        

            await this.repository.criaCliente(novoCliente);

            res.status(201).json(novoCliente);
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaClientes(req: Request, res: Response): Promise<void> {
        try {
            const listaDeClientes = await this.repository.listaClientes();
            res.status(200).json(listaDeClientes);
        } catch (error) {
            console.error("Erro ao listar clientes:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaCliente(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const cliente = await this.repository.listaCliente(Number(id));
            if (!cliente) {
                res.status(404).json({ message: "Cliente não encontrado." });
                return;
            }
            res.status(200).json(cliente);
        } catch (error) {
            console.error("Erro ao listar cliente:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaCliente(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { success, message } = await this.repository.atualizaCliente(
                Number(id),
                req.body as Cliente
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }
            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
