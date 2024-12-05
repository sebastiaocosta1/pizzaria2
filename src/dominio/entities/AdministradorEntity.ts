import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("administradores")
export class Administrador {
    @PrimaryGeneratedColumn()
    idadministrador: number;

    @Column({ length: 45 })
    nome: string;

    @Column({ length: 11, unique: true })
    cpf: string;

    @Column({ length: 45, unique: true })
    usuario: string;

    @Column({ length: 100 })
    senha: string;

    constructor(nome: string, cpf: string, usuario: string, senha: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.usuario = usuario;
        this.senha = senha;
    }
}
