import { Repository } from "typeorm";
import { Produto } from "../entities/ProdutoEntity";
import InterfaceProdutoRepository from "./interfaces/InterfaceProdutoRepository";

export default class ProdutoRepository implements InterfaceProdutoRepository {
    private repository: Repository<Produto>;

    constructor(repository: Repository<Produto>) {
        this.repository = repository;
    }

    criaProduto(produto: Produto): void {
        this.repository.save(produto);
    }

    async listaProdutos(): Promise<Produto[]> {
        return await this.repository.find();
    }

    async listaProduto(id: number): Promise<Produto | null> {
        return await this.repository.findOne({ where: { idprodutos: id } });
    }

    async atualizaProduto(
        id: number,
        produto: Produto
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const produtoToUpdate = await this.repository.findOne({ where: { idprodutos: id } });

            if (!produtoToUpdate) {
                return { success: false, message: "Produto não encontrado." };
            }

            Object.assign(produtoToUpdate, produto);

            await this.repository.save(produtoToUpdate);
            return { success: true, message: "Produto atualizado com sucesso!" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar o produto." };
        }
    }

    async deletaProduto(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
