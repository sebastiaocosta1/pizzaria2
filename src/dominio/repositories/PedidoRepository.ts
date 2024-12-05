import { Repository } from "typeorm";
import { Pedido } from "../entities/PedidoEntity";
import InterfacePedidoRepository from "./interfaces/InterfacePedidoRepository";
import { Cliente } from "../entities/ClienteEntity";
import { Produto } from "../entities/ProdutoEntity";

export default class PedidoRepository implements InterfacePedidoRepository {
    private repository: Repository<Pedido>;

    constructor(repository: Repository<Pedido>) {
        this.repository = repository;
    }

    // getClienteRepository(id: number): Promise<Cliente | null> {
    //     throw new Error("Method not implemented.");
    // }
    
    // async getProdutoRepository(id: number): Promise<Produto | null> {
    //     return await this.repository.findOne({ where: { idprodutos: id } });
    // }
    
    criaPedido(pedido: Pedido): void {
        this.repository.save(pedido);
    }

    async listaPedidos(): Promise<Pedido[]> {
        return await this.repository.find({ relations: ["cliente"] });
    }

    async listaPedido(id: number): Promise<Pedido | null> {
        return await this.repository.findOne({
            where: { idpedidos: id },
            relations: ["cliente"],
        });
    }

    async atualizaPedido(
        id: number,
        pedido: Pedido
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const pedidoToUpdate = await this.repository.findOne({ where: { idpedidos: id } });

            if (!pedidoToUpdate) {
                return { success: false, message: "Pedido não encontrado." };
            }

            Object.assign(pedidoToUpdate, pedido);

            await this.repository.save(pedidoToUpdate);
            return { success: true, message: "Pedido atualizado com sucesso!" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar o pedido." };
        }
    }

    async deletaPedido(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
