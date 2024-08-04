import { Router } from "express";
import { Diretor } from "../models/diretor.js";

export const diretorRoutes = Router();

diretorRoutes.get("/diretor", async (request, response) => {
  const diretores = await Diretor.findAll();
  return response.json(diretores);
});

diretorRoutes.get("/diretor/:id", async (request, response) => {
  const { id } = request.params;
  const diretor = await Diretor.findOne({
    where: { id: id },
    include: [Filme],
  });
  return response.json(diretor);
});
