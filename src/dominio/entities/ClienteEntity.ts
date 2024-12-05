import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Endereco } from "./EnderecoEntity";
import { Usuario } from "./UsuarioEntity";
import { Pedido } from "./PedidoEntity";

@Entity("clientes")
export class Cliente {
    @PrimaryGeneratedColumn()
    idclientes!: number;

    @Column({ length: 45 })
    ultimo_pedido: string;

    @OneToOne(() => Endereco, (endereco) => endereco.clientes, { eager: true })
    @JoinColumn() 
    endereco: Endereco;

    @ManyToOne(() => Usuario, (usuario) => usuario.clientes, { eager: true })
    usuario: Usuario;

    @OneToMany(() => Pedido, (pedido) => pedido.cliente, { eager: true })
    pedidos!: Pedido[];

    // Construtor
    constructor(
        ultimo_pedido: string,
        endereco: Endereco,
        usuario: Usuario,
        pedidos?: Pedido[]
    ) {
        this.ultimo_pedido = ultimo_pedido;
        this.endereco = endereco;
        this.usuario = usuario;
        this.pedidos = pedidos;
    }
}
