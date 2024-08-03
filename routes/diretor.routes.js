import { Router } from "express"
import { Diretor } from "../models/diretor.js";

export const diretorRoutes = Router();

diretorRoutes.get("/diretor", async (request, response)=> {
    const diretores = await Diretor.findAll();
    return response.json(diretores)
})