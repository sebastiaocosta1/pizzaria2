import { Repository } from "typeorm";
import { Endereco } from "../entities/EnderecoEntity";
import InterfaceEnderecoRepository from "./interfaces/InterfaceEnderecoRepository";

export default class EnderecoRepository implements InterfaceEnderecoRepository {
    private repository: Repository<Endereco>;

    constructor(repository: Repository<Endereco>) {
        this.repository = repository;
    }

    criaEndereco(item: Endereco): void {
        this.repository.save(item);
    }

    async listaEnderecos(): Promise<Endereco[]> {
        return await this.repository.find();
    }

    async listaEndereco(id: number): Promise<Endereco> {
        return await this.repository.findOne({ where: { idendereco: id } });
    }

    async atualizaEndereco(id: number, item: Endereco): Promise<{ success: boolean; message?: string }> {
        try {
            const entityToUpdate = await this.repository.findOne({ where: { idendereco: id } });

            if (!entityToUpdate) {
                return { success: false, message: "Endereço não encontrado." };
            }

            Object.assign(entityToUpdate, item);
            await this.repository.save(entityToUpdate);
            return { success: true, message: "Endereço atualizado com sucesso." };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar o endereço." };
        }
    }

    deletaEndereco(id: number): void {
        throw new Error("Method not implemented.");
    }
}
