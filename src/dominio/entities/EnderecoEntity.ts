import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cliente } from "./ClienteEntity";

@Entity("endereco")
export class Endereco {
    @PrimaryGeneratedColumn()
    idendereco: number;

    @Column({ length: 45 })
    rua: string;

    @Column({ length: 45 })
    cep: string;

    @Column({ length: 45 })
    numero: string;

    @Column({ length: 45 })
    bairro: string;

    @Column({ length: 45 })
    cidade: string;

    @Column({ length: 45 })
    estado: string;

    @Column({ length: 120 })
    ponto_referencia: string;

    @OneToMany(() => Cliente, (cliente) => cliente.endereco)
    clientes: Cliente[];

    // Construtor
    constructor(
        rua: string,
        cep: string,
        numero: string,
        bairro: string,
        cidade: string,
        estado: string,
        ponto_referencia: string
    ) {
        this.rua = rua;
        this.cep = cep;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.ponto_referencia = ponto_referencia;
    }
}
