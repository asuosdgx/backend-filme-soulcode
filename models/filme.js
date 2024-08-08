import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Ator } from "./ator.js";


export const Filme = connection.define("filme", {
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_lancamento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});



