import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

// criaçãp da tabela do diretor
export const Diretor = connection.define("diretor", {
    nome: {
        type: DataTypes.STRING(130),
        allowNull: false
    },
    nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nacionalidade: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
});