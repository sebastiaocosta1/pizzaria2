import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("cupom_desconto")
export class CupomDesconto {
    @PrimaryGeneratedColumn()
    idcupom_desconto!: number;

    @Column({ length: 45 })
    codigo: string;

    @Column({ length: 45 })
    descricao: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor_desconto: number;

    @Column({ length: 45 })
    cpf: string;

    @Column({ length: 45 })
    status: string;

    // Construtor
    constructor(
        codigo: string,
        descricao: string,
        valor_desconto: number,
        cpf: string,
        status: string
    ) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.valor_desconto = valor_desconto;
        this.cpf = cpf;
        this.status = status;
    }
}

