import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Cliente } from "./ClienteEntity";
import { Produto } from "./ProdutoEntity";

@Entity("pedidos")
export class Pedido {
    @PrimaryGeneratedColumn()
    idpedidos: number;

    @Column({ length: 12 })
    data_pedido: string;

    @Column({ length: 45 })
    status: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor_frete: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor_desconto: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor_total: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
    cliente: Cliente;

    @OneToMany(() => Produto, (produto) => produto.pedido)
    produtos: Produto[];

    // Construtor
    constructor(
        data_pedido: string,
        status: string,
        valor_frete: number,
        valor_desconto: number,
        valor_total: number,
        cliente: Cliente,
        produtos: Produto[]
    ) {
        this.data_pedido = data_pedido;
        this.status = status;
        this.valor_frete = valor_frete;
        this.valor_desconto = valor_desconto;
        this.valor_total = valor_total;
        this.cliente = cliente;
        this.produtos = produtos;
    }
}
