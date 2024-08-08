import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Filme } from "./filme.js";
import { Ator } from "./ator.js";

// criação da tabela do diretor
export const Diretor = connection.define("diretor", {
    nome: {
        type: DataTypes.STRING(130),
        allowNull: false,
        unique: true
    },
    nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    nacionalidade: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
});

Filme.hasOne(Diretor, { onDelete: "CASCADE" });
Diretor.belongsTo(Filme);

Filme.hasMany(Ator, { onDelete: "CASCADE" });
Ator.belongsTo(Filme)

