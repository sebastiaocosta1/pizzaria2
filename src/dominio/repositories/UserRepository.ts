import { Repository } from "typeorm";
import { Usuario } from "../entities/UsuarioEntity";
import InterfaceUserRepository from "./interfaces/InterfaceUserRepository";

export default class UserRepository implements InterfaceUserRepository{
    private repository: Repository<Usuario>;

    constructor(repository: Repository<Usuario>){
        this.repository = repository;
    }
    criaUsuario(user: Usuario): void {
        this.repository.save(user);
    }

    async listaUsuarios(): Promise<Usuario[]> {
        return await this.repository.find();
    }

    async listaUsuario(id: number): Promise<Usuario> {
        return await this.repository.findOne({ where: { idusuarios: id } });
    }

    async atualizaUsuarios(id: number, user: Usuario): Promise<{ success: boolean; message?: string; }> {
        try {
            const userToUpdate = await this.repository.findOne({ where: { idusuarios: id } });
    
            if (!userToUpdate) {
                return { success: false, message: "Usuário não encontrado." };
            }
    
            Object.assign(userToUpdate, user);
            
            await this.repository.save(userToUpdate);            
            return { success: true, message: "Usuario atualizado!." };
            
        } catch (error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar o Usuário." };
        }
    }

    async deletaUsuarios(id: number, user: Usuario): Promise<{ success: boolean; message?: string; }> {
                try {
            const userToDelete = await this.repository.findOne({ where: { idusuarios: id } });
    
            if (!userToDelete) {
                return { success: false, message: "Usuário não encontrado." };
            }
            
            await this.repository.delete(userToDelete);            
            return { success: true, message: "Usuario excluido com sucesso!." };
            
        } catch (error) {
            console.error(error);
            return { success: false, message: "Erro ao excluir o Usuário." };
        }
    }
}