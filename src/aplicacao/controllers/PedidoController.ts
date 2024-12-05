import { Request, Response } from "express";
import { Pedido } from "../../dominio/entities/PedidoEntity";
import InterfacePedidoRepository from "../../dominio/repositories/interfaces/InterfacePedidoRepository";

export default class PedidoController {
    constructor(private repository: InterfacePedidoRepository) {}

    async criaPedido(req: Request, res: Response): Promise<void> {
        try {
            const { data_pedido, status, valor_frete, valor_desconto, valor_total, cliente, produtos } = <Pedido>req.body;
            // console.log(req.body)
            if (!data_pedido || !status || !valor_frete || !valor_desconto || !valor_total || !cliente || !produtos) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                return;
            }
        
            const novoPedido = new Pedido(
                data_pedido,
                status,
                valor_frete,
                valor_desconto,
                valor_total,
                cliente,
                produtos
            );

            await this.repository.criaPedido(novoPedido);

            res.status(201).json(novoPedido);
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaPedidos(req: Request, res: Response): Promise<void> {
        try {
            const listaDePedidos = await this.repository.listaPedidos();
            res.status(200).json(listaDePedidos);
        } catch (error) {
            console.error("Erro ao listar pedidos:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaPedido(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const pedido = await this.repository.listaPedido(Number(id));

            if (!pedido) {
                res.status(404).json({ message: "Pedido não encontrado!" });
            }

            res.status(200).json(pedido);
        } catch (error) {
            console.error("Erro ao listar pedido:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaPedido(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { success, message } = await this.repository.atualizaPedido(
                Number(id),
                req.body as Pedido
            );

            if (!success) {
                res.status(404).json({ message });
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar pedido:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaPedido(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.repository.deletaPedido(Number(id));
            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar pedido:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
