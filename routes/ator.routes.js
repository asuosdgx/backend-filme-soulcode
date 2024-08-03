import { Router } from "express"
import { Ator } from "../models/ator.js"; 
import { Filme } from "../models/filme.js";

export const atorRoutes = Router();

atorRoutes.get("/ator", async (request, response)=> {
    const atores = await Ator.findAll();
    return response.json(atores)
})

atorRoutes.get("/ator/:id", async (request, response)=> {
    const { id } = request.params
    const ator = await Ator.findOne({ where: {id: id}, include: [Filme] });
    return response.json(ator)
})

atorRoutes.post("/ator", async (request, response) => {
    const {nome, nascimento, nacionalidade, filmeId} = request.body
    
    try{
        await Ator.create(
            { nome, nascimento, nacionalidade, filmeId }
        );
        return response.status(201).json({ message: "Ator criado com sucesso" })
    }catch(err){
        return response.status(500).json({ message: "Um erro ocorreu ao inserir Ator" })
    }
})

atorRoutes.put("/ator/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, nascimento, nacionalidade, filmeId } = req.body;
  
    try {
      const ator = await Ator.findOne({ where: { id: id } });
      console.log(ator)
        
      if (ator) {
        await Ator.update({ nome, nascimento, nacionalidade, filmeId }, { where: { id: id } });
        res.json({ message: "Ator atualizado." });
      } else {
        res.status(404).json({ message: "Ator não encontrado." });
      }
    } catch (err) {
      res.status(500).json({message: "Ocorreu um erro ao atualizar o Ator."});
    }
})

atorRoutes.delete("/ator/:id", async (request, response) => {
    const { id } = request.params;
    try{
        const ator = await Ator.findOne({ where: {id: id} });

        if(ator){
            await Ator.destroy({ where: {id: id} });
            response.json({ message: "Ator removido com sucesso" })
        }else{
            response.status(404).json({ message: "Ator não encontrado" })
        }
        
    }catch(err){
        response.status(500).json({ message: "Um erro aconteceu ao excluir um ator" })
    }

})