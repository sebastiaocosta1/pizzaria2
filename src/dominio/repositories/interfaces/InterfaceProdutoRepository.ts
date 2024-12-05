import { Produto } from "../../entities/ProdutoEntity";

export default interface InterfaceProdutoRepository {
    criaProduto(produto: Produto): void;
    listaProdutos(): Promise<Produto[]>;
    listaProduto(id: number): Promise<Produto | null>;
    atualizaProduto(
        id: number,
        produto: Produto
    ): Promise<{ success: boolean; message?: string }>;
    deletaProduto(id: number): void;
}
