"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const recetas_1 = __importDefault(require("./recetas"));
const usuario_1 = __importDefault(require("./usuario"));
class Favorita extends sequelize_1.Model {
}
Favorita.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    recetaId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    usuarioId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    modelName: 'Favorita',
});
Favorita.belongsTo(recetas_1.default, {
    foreignKey: 'recetaId',
    as: 'receta',
});
Favorita.belongsTo(usuario_1.default, {
    foreignKey: 'usuarioId',
    as: 'usuario',
});
exports.default = Favorita;
//# sourceMappingURL=favoritas.js.map