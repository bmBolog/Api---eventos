import { Request, Response, Router } from "express";
import prisma from "../prismaClient";
 
const router = Router();
 
 
// Cadastro palestrante
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nome, email } = req.body;
 
    // Verifica se os campos foram preenchidos
    if (!nome || !email) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios"
      });
    }
 
    // Verifica se o e-mail já está cadastrado
    const palestranteExistente = await prisma.palestrante.findUnique({
      where: {
        email
      }
    });
 
    if (palestranteExistente) {
      return res.status(400).json({
        mensagem: "Este e-mail já está cadastrado"
      });
    }
 
    // Criar palestrante
    const palestrante = await prisma.palestrante.create({
      data: {
        nome,
        email
      }
    });
 
    return res.status(201).json({
      mensagem: "Cadastro concluído!",
      palestrante
    });
 
  } catch (erro) {
    console.error(erro);
 
    return res.status(500).json({
      mensagem: "Erro ao cadastrar palestrante"
    });
  }
});
 
 
// Listar palestrantes
router.get("/", async (req: Request, res: Response) => {
  try {
    const palestrantes = await prisma.palestrante.findMany({
      orderBy: {
        nome: "asc"
      }
    });
 
    return res.status(200).json(palestrantes);
 
  } catch (erro) {
    console.error(erro);
 
    return res.status(500).json({
      mensagem: "Erro ao listar palestrantes"
    });
  }
});
 
 
// Buscar por id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
 
    const palestrante = await prisma.palestrante.findUnique({
      where: {
        id
      }
    });
 
    if (!palestrante) {
      return res.status(404).json({
        mensagem: "Palestrante não encontrado"
      });
    }
 
    return res.status(200).json(palestrante);
 
  } catch (erro) {
    console.error(erro);
 
    return res.status(500).json({
      mensagem: "Erro ao buscar palestrante"
    });
  }
});
 
 
// Editar palestrante
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
 
    const { nome, email } = req.body;
 
    // Verifica se os campos foram preenchidos
    if (!nome || !email) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios"
      });
    }
 
    // Verifica se o palestrante existe
    const palestranteExistente = await prisma.palestrante.findUnique({
      where: {
        id
      }
    });
 
    if (!palestranteExistente) {
      return res.status(404).json({
        mensagem: "Palestrante não encontrado"
      });
    }
 
    // Verifica se o novo e-mail já é usado por outro palestrante
    const emailExistente = await prisma.palestrante.findUnique({
      where: {
        email
      }
    });
 
    if (emailExistente && emailExistente.id !== id) {
      return res.status(400).json({
        mensagem: "Este e-mail já está cadastrado"
      });
    }
 
    const palestrante = await prisma.palestrante.update({
      where: {
        id
      },
 
      data: {
        nome,
        email
      }
    });
 
    return res.status(200).json({
      mensagem: "Palestrante atualizado com sucesso",
      palestrante
    });
 
  } catch (erro) {
    console.error(erro);
 
    return res.status(500).json({
      mensagem: "Erro ao atualizar palestrante"
    });
  }
});
 
 
// Excluir palestrante
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
 
    // Verifica se o palestrante existe
    const palestrante = await prisma.palestrante.findUnique({
      where: {
        id
      }
    });
 
    if (!palestrante) {
      return res.status(404).json({
        mensagem: "Palestrante não encontrado"
      });
    }
 
    await prisma.palestrante.delete({
      where: {
        id
      }
    });
 
    return res.status(200).json({
      mensagem: "Palestrante excluído com sucesso"
    });
 
  } catch (erro) {
    console.error(erro);
 
    return res.status(500).json({
      mensagem: "Erro ao excluir palestrante"
    });
  }
});
 
 
export default router;