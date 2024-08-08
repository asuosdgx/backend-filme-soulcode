import { connection, authenticate } from "./config/database.js";
import { filmesRoutes } from "./routes/filmes.routes.js";
import { diretorRoutes } from "./routes/diretor.routes.js";
import { atorRoutes } from "./routes/ator.routes.js";
import express from "express";
import cors from "cors";

authenticate(connection).then( () => {
    //connection.sync({ force:true });
    connection.sync();
})
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(filmesRoutes);
app.use(diretorRoutes);
app.use(atorRoutes);


const PORT = 3333;
app.listen(PORT, console.log(`O servidor está rodando na porta ${PORT}`))