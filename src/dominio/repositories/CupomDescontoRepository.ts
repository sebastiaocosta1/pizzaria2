import { Repository } from "typeorm";
import { CupomDesconto } from "../entities/CupomDescontoEntity";
import InterfaceCupomDescontoRepository from "./interfaces/InterfaceCupomDescontoRepository";

export default class CupomDescontoRepository implements InterfaceCupomDescontoRepository {
    private repository: Repository<CupomDesconto>;

    constructor(repository: Repository<CupomDesconto>) {
        this.repository = repository;
    }

    criaCupomDesconto(cupom: CupomDesconto): void {
        this.repository.save(cupom);
    }

    async listaCuponsDesconto(): Promise<CupomDesconto[]> {
        return await this.repository.find();
    }

    async listaCupomDesconto(id: number): Promise<CupomDesconto> {
        return await this.repository.findOne({ where: { idcupom_desconto: id } });
    }

    async atualizaCupomDesconto(
        id: number,
        cupom: CupomDesconto
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const cupomToUpdate = await this.repository.findOne({ where: { idcupom_desconto: id } });

            if (!cupomToUpdate) {
                return { success: false, message: "Cupom de desconto não encontrado." };
            }

            Object.assign(cupomToUpdate, cupom);

            await this.repository.save(cupomToUpdate);
            return { success: true, message: "Cupom de desconto atualizado com sucesso!" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar o cupom de desconto." };
        }
    }

    async deletaCupomDesconto(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
