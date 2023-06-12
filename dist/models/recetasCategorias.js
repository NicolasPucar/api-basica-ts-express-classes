"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const recetas_1 = __importDefault(require("./recetas"));
const categorias_1 = __importDefault(require("./categorias"));
class RecetasCategorias extends sequelize_1.Model {
}
RecetasCategorias.init({
    recetaId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: recetas_1.default,
            key: 'id',
        },
    },
    categoriaId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: categorias_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: config_1.default,
    modelName: 'RecetasCategorias',
    timestamps: false, // No se utilizarán timestamps en esta tabla
});
exports.default = RecetasCategorias;
//# sourceMappingURL=recetasCategorias.js.map