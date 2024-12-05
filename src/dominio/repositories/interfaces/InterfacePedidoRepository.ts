import { Cliente } from "../../entities/ClienteEntity";
import { Pedido } from "../../entities/PedidoEntity";
import { Produto } from "../../entities/ProdutoEntity";

export default interface InterfacePedidoRepository {
    // getClienteRepository(id: number): Promise<Cliente | null>;
    // getProdutoRepository(id: number): Promise<Produto | null>;
    criaPedido(pedido: Pedido): void;
    listaPedidos(): Promise<Pedido[]>;
    listaPedido(id: number): Promise<Pedido | null>;
    atualizaPedido(
        id: number,
        pedido: Pedido
    ): Promise<{ success: boolean; message?: string }>;
    deletaPedido(id: number): void;
}
