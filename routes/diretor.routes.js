import { Router } from "express";
import { Diretor } from "../models/diretor.js";
import { Filme } from "../models/filme.js";

export const diretorRoutes = Router();

diretorRoutes.get("/diretor", async (request, response) => {
  const diretores = await Diretor.findAll();
  return response.json(diretores);
});

diretorRoutes.get("/diretor/:id", async (req, res)=> {
  const { id } = req.params
  const diretor = await Diretor.findOne({ where: {id: id}, include: [Filme] });
  return res.json(diretor)
})
diretorRoutes.post("/diretor", async (request, response) => {
  const {nome, nascimento, nacionalidade} = request.body
  
  if(!nome || !nascimento || !nacionalidade ){
      return response.status(500).json({ status: "error", message: "campos não preenchidos"})
  }

  try{
      await Diretor.create(
          { nome, nascimento, nacionalidade}
      );
      return response.status(201).json({ message: "Diretor inserido com sucesso" })
  }catch(err){
      return response.status(500).json({ message: "Um erro ocorreu ao inserir dados." })
  }
})

diretorRoutes.put("/diretor/:id", async (req, res) => {
  const  id  = req.params.id;
  const { nome, nascimento, nacionalidade } = req.body;
  

  try {
    const diretor = await Diretor.findOne({ where: { id: id } });
      
    if (diretor) {
      await diretor.update({ nome, nascimento, nacionalidade });
      res.json({ message: "Diretor atualizado." });
    } else {
      res.status(404).json({ message: "Diretor não encontrado." });
    }
  } catch (err) {
    res.status(500).json({message: "Ocorreu um erro ao atualizar o diretor."});
    console.log(err)
  }
})

diretorRoutes.delete("/diretor/:id", async (request, response) => {
  const { id } = request.params;
  try{
      const filme = await Diretor.findOne({ where: {id: id} });

      if(filme){
          await Diretor.destroy({ where: {id: id} });
          response.json({ message: "Diretor removido com sucesso" })
      }else{
          response.status(404).json({ message: "Diretor não encontrado" })
      }
      
  }catch(err){
      response.status(500).json({ message: "Um erro aconteceu ao excluir o diretor" })
  }

})