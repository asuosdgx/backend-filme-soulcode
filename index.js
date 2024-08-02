import { connection, authenticate } from "./config/database.js";
import { filmesRoutes } from "./routes/filmes.routes.js";
import express from "express";

authenticate(connection).then( () => {
    //connection.sync({ force:true });
    connection.sync();
})
const app = express();
app.use(express.json());
app.use(filmesRoutes)



const PORT = 3333;
app.listen(PORT, console.log(`O servidor está rodando na porta ${PORT}`))