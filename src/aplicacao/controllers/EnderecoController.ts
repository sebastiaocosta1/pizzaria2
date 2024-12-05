import { Request, Response } from "express";
import { Endereco } from "../../dominio/entities/EnderecoEntity";
import InterfaceEnderecoRepository from "../../dominio/repositories/interfaces/InterfaceEnderecoRepository";

export default class EnderecoController {
    constructor(private repository: InterfaceEnderecoRepository) {}

    async criaEndereco(req: Request, res: Response): Promise<void> {
        try {
            const { rua, cep, numero, bairro, cidade, estado, ponto_referencia } = <Endereco>req.body;

            if (!rua || !cep || !numero || !bairro || !cidade || !estado || !ponto_referencia) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                return;
            }

            const novoEndereco = new Endereco(
                rua,
                cep,
                numero,
                bairro,
                cidade,
                estado,
                ponto_referencia
            );            

            await this.repository.criaEndereco(novoEndereco);

            res.status(201).json(novoEndereco);
        } catch (error) {
            console.error("Erro ao criar endereço:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaEnderecos(req: Request, res: Response): Promise<void> {
        try {
            const listaDeEnderecos = await this.repository.listaEnderecos();
            res.status(200).json(listaDeEnderecos);
        } catch (error) {
            console.error("Erro ao listar endereços:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaEndereco(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const endereco = await this.repository.listaEndereco(Number(id));
            if (!endereco) {
                res.status(404).json({ message: "Endereço não encontrado." });
            } else {
                res.status(200).json(endereco);
            }
        } catch (error) {
            console.error("Erro ao buscar endereço:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaEndereco(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const { success, message } = await this.repository.atualizaEndereco(
                Number(id),
                req.body as Endereco
            );

            if (!success) {
                res.status(404).json({ message });
            } else {
                res.sendStatus(204);
            }
        } catch (error) {
            console.error("Erro ao atualizar endereço:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaEndereco(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await this.repository.deletaEndereco(Number(id));
            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar endereço:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
