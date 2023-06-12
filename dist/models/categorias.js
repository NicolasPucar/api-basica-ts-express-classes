"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeCategorias = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Categoria extends sequelize_1.Model {
}
Categoria.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    modelName: 'Categoria',
});
exports.default = Categoria;
function initializeCategorias() {
    return __awaiter(this, void 0, void 0, function* () {
        const categoriasPorDefecto = [
            'sopa',
            'desayuno',
            'aperitivo',
            'principal',
            'postre',
            'compartir',
            'bebidas',
            'vegetariano',
            'glutenFree',
            'caliente',
            'frío',
            'Boliviano Tradicional',
            'Rápido y Fácil',
            'Bajo en Calorías'
        ];
        for (const nombre of categoriasPorDefecto) {
            // Esto creará la categoría si no existe aún
            yield Categoria.findOrCreate({ where: { nombre } });
        }
    });
}
exports.initializeCategorias = initializeCategorias;
//# sourceMappingURL=categorias.js.map