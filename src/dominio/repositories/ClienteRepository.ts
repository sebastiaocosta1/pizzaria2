import { Repository } from "typeorm";
import { Cliente } from "../entities/ClienteEntity";
import InterfaceClienteRepository from "./interfaces/InterfaceClienteRepository";

export default class ClienteRepository implements InterfaceClienteRepository {
    private repository: Repository<Cliente>;

    constructor(repository: Repository<Cliente>) {
        this.repository = repository;
    }

    criaCliente(cliente: Cliente): void {
        this.repository.save(cliente);
    }

    async listaClientes(): Promise<Cliente[]> {
        return await this.repository.find({
            relations: ["endereco", "usuario", "pedidos"], // Inclui os relacionamentos relevantes
        });
    }

    async listaCliente(id: number): Promise<Cliente | null> {
        return await this.repository.findOne({
            where: { idclientes: id },
            relations: ["endereco", "usuario", "pedidos"], // Inclui os relacionamentos relevantes
        });
    }

    async atualizaCliente(
        id: number,
        cliente: Cliente
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const clienteToUpdate = await this.repository.findOne({ where: { idclientes: id } });

            if (!clienteToUpdate) {
                return { success: false, message: "Cliente não encontrado." };
            }

            Object.assign(clienteToUpdate, cliente);

            await this.repository.save(clienteToUpdate);
            return { success: true, message: "Cliente atualizado com sucesso!" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar o cliente." };
        }
    }

    async deletaCliente(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
