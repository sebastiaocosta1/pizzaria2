import { Endereco } from "../../entities/EnderecoEntity";

export default interface InterfaceEnderecoRepository {
    criaEndereco(item: Endereco): void;
    listaEnderecos(): Promise<Endereco[]>;
    listaEndereco(id: number): Promise<Endereco>;
    atualizaEndereco(id: number, item: Endereco): Promise<{ success: boolean; message?: string }>;
    deletaEndereco(id: number): void;
}
