import { Cliente } from "../../entities/ClienteEntity";

export default interface InterfaceClienteRepository {
    criaCliente(cliente: Cliente): void;
    listaClientes(): Promise<Cliente[]>;
    listaCliente(id: number): Promise<Cliente | null>;
    atualizaCliente(
        id: number,
        cliente: Cliente
    ): Promise<{ success: boolean; message?: string }>;
    deletaCliente(id: number): void;
}
