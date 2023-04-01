"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Usuario extends sequelize_1.Model {
}
exports.Usuario = Usuario;
Usuario.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_2.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize: config_1.default,
    modelName: 'Usuario'
});
//# sourceMappingURL=usuario.js.map