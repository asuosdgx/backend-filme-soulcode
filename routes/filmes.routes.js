import { Router } from "express";
import { Filme } from "../models/filme.js";
import { Diretor } from "../models/diretor.js";
import { Ator } from "../models/ator.js";

export const filmesRoutes = Router()


filmesRoutes.get("/filme", async (request, response)=> {
    const filmes = await Filme.findAll();
    return response.json(filmes)
})

filmesRoutes.get("/filme/:id", async (request, response)=> {
    const { id } = request.params
    const filme = await Filme.findOne({ where: {id: id}, include: [Diretor] });
    return response.json(filme)
})

filmesRoutes.post("/filme", async (request, response) => {
    const {titulo, descricao, data_lancamento, diretor} = request.body
    
    if(!titulo || !descricao || !data_lancamento || !diretor){
        return response.status(500).json({ status: "error", message: "campos não preenchido"})
    }

    try{
        await Filme.create(
            { titulo, descricao, data_lancamento, diretor},
            { include: [Diretor] }
        );
        return response.status(201).json({ message: "Filme criado com sucesso" })
    }catch(err){
        return response.status(500).json({ message: "Um erro ocorreu ao inserir filme" })
    }
})

filmesRoutes.put("/filme/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, data_lancamento, diretor } = req.body;
  
    try {
      const filme = await Filme.findOne({ where: { id: id } });
        
      if (filme) {
        await Diretor.update(diretor, { where: { filmeId: id } });
        await Filme.update({ titulo, descricao, data_lancamento });
        res.json({ message: "Filme atualizado." });
      } else {
        res.status(404).json({ message: "Filme não encontrado." });
      }
    } catch (err) {
      res.status(500).json({message: "Ocorreu um erro ao atualizar o filme."});
    }
})

filmesRoutes.delete("/filme/:id", async (request, response) => {
    const { id } = request.params;
    try{
        const filme = await Filme.findOne({ where: {id: id} });

        if(filme){
            await Filme.destroy({ where: {id: id} });
            response.json({ message: "Filme removido com sucesso" })
        }else{
            response.status(404).json({ message: "Filme não encontrado" })
        }
        
    }catch(err){
        response.status(500).json({ message: "Um erro aconteceu ao excluir o filme" })
    }

})