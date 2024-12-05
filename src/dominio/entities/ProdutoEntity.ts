import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pedido } from "./PedidoEntity";

@Entity("produtos")
export class Produto {
    @PrimaryGeneratedColumn()
    idprodutos: number;

    @Column({ length: 45 })
    descricao: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    preco_venda: number;

    @Column({ length: 45 })
    categoria: string;

    @Column({ length: 45 })
    subcategoria: string;

    @ManyToOne(() => Pedido, (pedido) => pedido.produtos)
    pedido: Pedido;

    // Construtor
    constructor(
        descricao: string,
        preco_venda: number,
        categoria: string,
        subcategoria: string,
        pedido?: Pedido
    ) {
        this.descricao = descricao;
        this.preco_venda = preco_venda;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        if (pedido) this.pedido = pedido;
    }
}
