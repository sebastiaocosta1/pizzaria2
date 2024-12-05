import { CupomDesconto } from "../../entities/CupomDescontoEntity";

export default interface InterfaceCupomDescontoRepository {
    criaCupomDesconto(cupom: CupomDesconto): void;
    listaCuponsDesconto(): Promise<CupomDesconto[]>;
    listaCupomDesconto(id: number): Promise<CupomDesconto>;
    atualizaCupomDesconto(
        id: number,
        cupom: CupomDesconto
    ): Promise<{ success: boolean; message?: string }>;
    deletaCupomDesconto(id: number): void;
}
