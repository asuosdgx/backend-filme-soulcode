import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Ator = connection.define("ator", {
    nome: {
        type: DataTypes.STRING(140),
        allowNull: false
    },
    nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nacionalidade: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});