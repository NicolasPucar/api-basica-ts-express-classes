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
exports.populateFullReceta = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const recetas_1 = __importDefault(require("./recetas"));
class FullReceta extends sequelize_1.Model {
}
FullReceta.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    tiempoPreparacion: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    ingredientes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get: function () {
            return JSON.parse(this.getDataValue('ingredientes'));
        },
        set: function (val) {
            this.setDataValue('ingredientes', JSON.stringify(val));
        }
    },
    pasos: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get: function () {
            return JSON.parse(this.getDataValue('pasos'));
        },
        set: function (val) {
            this.setDataValue('pasos', JSON.stringify(val));
        }
    },
    porciones: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    tipoComida: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING(40)),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: config_1.default,
    modelName: 'FullReceta',
});
exports.default = FullReceta;
function populateFullReceta() {
    return __awaiter(this, void 0, void 0, function* () {
        const recetas = yield recetas_1.default.findAll();
        for (let receta of recetas) {
            yield FullReceta.create(yield mostrarRecetaYsusCategorias(receta.id));
        }
    });
}
exports.populateFullReceta = populateFullReceta;
function mostrarRecetaYsusCategorias(idReceta) {
    return __awaiter(this, void 0, void 0, function* () {
        const receta = yield recetas_1.default.findByPk(idReceta);
        if (!receta) {
            console.log('Receta no encontrada');
            return new FullReceta();
        }
        const categorias = yield receta.getCategorias();
        // Mapear cada categoria a un objeto que solo contiene "id" y "nombre"
        const categoriasSimples = categorias.map(categoria => ({
            id: categoria.id,
            tipoComida: categoria.nombre,
        }));
        let catstring = () => {
            let result = [];
            for (let i = 0; i < categoriasSimples.length; i++) {
                result.push(categoriasSimples[i].tipoComida.toString());
            }
            return result;
        };
        let recetaJoined = yield FullReceta.create({
            id: receta.id,
            nombre: receta.nombre,
            descripcion: receta.descripcion,
            imagen: receta.imagen,
            tiempoPreparacion: receta.tiempoPreparacion,
            porciones: receta.porciones,
            ingredientes: receta.ingredientes,
            pasos: receta.pasos,
            tipoComida: catstring(),
            estado: receta.estado,
        });
        let fullRecipe = recetaJoined;
        return fullRecipe;
    });
}
//# sourceMappingURL=fullRecetas.js.map