import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cliente } from "./ClienteEntity";

@Entity("usuarios")
export class Usuario {
    @PrimaryGeneratedColumn()
    idusuarios!: number;

    @Column({ length: 45 })
    nome: string;

    @Column({ length: 45 })
    telefone: string;

    @Column("date")
    dt_nascimento: Date;

    @Column({ length: 11 })
    cpf: string;

    @Column({ length: 45 })
    email: string;

    @Column({ length: 100 })
    senha: string;

    @OneToMany(() => Cliente, (cliente) => cliente.usuario)
    clientes: Cliente[];

    // Construtor
    constructor(
        nome: string,
        telefone: string,
        dt_nascimento: Date,
        cpf: string,
        email: string,
        senha: string,        
    ) {
        this.nome = nome;
        this.telefone = telefone;
        this.dt_nascimento = dt_nascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;        
    }
}
