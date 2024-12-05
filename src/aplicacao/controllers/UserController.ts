import { NextFunction, Request, Response } from "express";
import { Usuario } from "../../dominio/entities/UsuarioEntity";
import InterfaceUserRepository from "../../dominio/repositories/interfaces/InterfaceUserRepository";
import bcrypt from "bcrypt";

export default class UserController {
    constructor(private repository: InterfaceUserRepository){}
 
    async criaUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { nome, telefone, dt_nascimento, cpf, email, senha} = <Usuario>req.body;            

            if (!nome || !telefone || !dt_nascimento || !cpf || !email || !senha) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                return;
            }
            const senhaHash = await bcrypt.hash(senha, 10);   
            const novoUsuario = new Usuario(
              nome,
              telefone,
              dt_nascimento,
              cpf,
              email,
              senhaHash              
            );           

            await this.repository.criaUsuario(novoUsuario);

            res.status(201).json(novoUsuario);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaUsuarios(req: Request, res: Response) {
    const listaDeUsuarios = await this.repository.listaUsuarios();      
    res.status(200).json(listaDeUsuarios);
   }

   async listaUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const usuario = await this.repository.listaUsuario(Number(id)); 
    if(usuario == null){
       return res.status(404).json({mensagem: "Usuário não encontrado!"});
    }     
    res.status(200).json(usuario);
   }
   
   async atualizaUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaUsuarios(
          Number(id),
          req.body as Usuario
        );
    
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
      }

      async deletaUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletaUsuarios(
          Number(id),
          req.body as Usuario
        );
    
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
      }

      async teste(req: Request, res: Response, next: NextFunction){
        console.log("teste");
        next();
      }

    }
