"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.initDatabase = void 0;
const config_1 = __importDefault(require("./config"));
const categorias_1 = __importStar(require("../models/categorias"));
const recetas_1 = __importDefault(require("../models/recetas"));
const favoritas_1 = __importDefault(require("../models/favoritas"));
const like_1 = __importDefault(require("../models/like"));
const assignations_1 = __importDefault(require("./assignations")); // Importa la función assignation
const recetasCategorias_1 = __importDefault(require("../models/recetasCategorias")); // Importa el modelo RecetasCategorias
const fullRecetas_1 = __importStar(require("../models/fullRecetas"));
function initDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield config_1.default.authenticate();
            console.log('Conexión a la base de datos establecida.');
            // Sincronizar los modelos con la base de datos
            yield (0, categorias_1.initializeCategorias)();
            yield recetas_1.default.sync();
            yield categorias_1.default.sync();
            yield recetasCategorias_1.default.sync(); // Sincroniza el modelo RecetasCategorias
            yield (0, assignations_1.default)();
            yield favoritas_1.default.sync();
            yield (0, fullRecetas_1.populateFullReceta)();
            yield like_1.default.sync();
            yield fullRecetas_1.default.sync();
            console.log('Base de datos y tablas creadas exitosamente.');
            // Asignar categorías a una receta
            console.log('Categorías asignadas a la receta exitosamente.');
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    });
}
exports.initDatabase = initDatabase;
//# sourceMappingURL=init.js.map