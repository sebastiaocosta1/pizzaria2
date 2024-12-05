import { Request, Response } from "express";
import { CupomDesconto } from "../../dominio/entities/CupomDescontoEntity";
import InterfaceCupomDescontoRepository from "../../dominio/repositories/interfaces/InterfaceCupomDescontoRepository";

export default class CupomDescontoController {
    constructor(private repository: InterfaceCupomDescontoRepository) {}
    

    async criaCupomDesconto(req: Request, res: Response): Promise<void> {
        try {
                       
            const { codigo, descricao, valor_desconto, cpf, status} = <CupomDesconto>req.body;

            if (!codigo || !descricao || !valor_desconto || !cpf || !status) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                return;
            }

            const novoCupom = new CupomDesconto(
                codigo,
                descricao,
                valor_desconto,
                cpf,
                status);
           
            await this.repository.criaCupomDesconto(novoCupom);

            res.status(201).json(novoCupom);
        } catch (error) {
            console.error("Erro ao criar cupom de desconto:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaCuponsDesconto(req: Request, res: Response) {
        try {
            const listaDeCupons = await this.repository.listaCuponsDesconto();
            res.status(200).json(listaDeCupons);
        } catch (error) {
            console.error("Erro ao listar cupons de desconto:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaCupomDesconto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cupom = await this.repository.listaCupomDesconto(Number(id));

            if (!cupom) {
                return res.status(404).json({ message: "Cupom de desconto não encontrado!" });
            }

            res.status(200).json(cupom);
        } catch (error) {
            console.error("Erro ao listar cupom de desconto:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaCupomDesconto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { success, message } = await this.repository.atualizaCupomDesconto(
                Number(id),
                req.body as CupomDesconto
            );

            if (!success) {
                return res.status(404).json({ message });
            }

            return res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar cupom de desconto:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaCupomDesconto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.repository.deletaCupomDesconto(Number(id));
            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar cupom de desconto:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
