import { Request, Response } from "express";
import { Produto } from "../../dominio/entities/ProdutoEntity";
import InterfaceProdutoRepository from "../../dominio/repositories/interfaces/InterfaceProdutoRepository";

export default class ProdutoController {
    constructor(private repository: InterfaceProdutoRepository) {}

    async criaProduto(req: Request, res: Response): Promise<void> {
        try {
            const { descricao, preco_venda, categoria, subcategoria } = <Produto>req.body;

            if (!descricao || !preco_venda || !categoria || !subcategoria) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                return;
            }

            const novoProduto = new Produto(
                descricao,
                preco_venda,
                categoria,
                subcategoria 
            );
            
            await this.repository.criaProduto(novoProduto);

            res.status(201).json(novoProduto);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaProdutos(req: Request, res: Response): Promise<void> {
        try {
            const listaDeProdutos = await this.repository.listaProdutos();
            res.status(200).json(listaDeProdutos);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const produto = await this.repository.listaProduto(Number(id));

            if (!produto) {
                res.status(404).json({ message: "Produto não encontrado!" });
            }

            res.status(200).json(produto);
        } catch (error) {
            console.error("Erro ao listar produto:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { success, message } = await this.repository.atualizaProduto(
                Number(id),
                req.body as Produto
            );

            if (!success) {
                res.status(404).json({ message });
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.repository.deletaProduto(Number(id));
            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
