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
const categorias_1 = __importDefault(require("../models/categorias"));
const recetas_1 = __importDefault(require("../models/recetas"));
const recetasCategorias_1 = __importDefault(require("../models/recetasCategorias"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    // 1. Carga todas las recetas y categorías por adelantado
    const recetas = yield recetas_1.default.findAll();
    const todasLasCategorias = yield categorias_1.default.findAll();
    // 2. Crea un mapa de categorías por nombre y de recetas para un acceso más fácil
    const mapaCategorias = new Map(todasLasCategorias.map(categoria => [categoria.nombre, categoria]));
    const mapaRecetas = new Map(recetas.map(receta => [receta.nombre, receta]));
    // 3. Construye un array de objetos que representen las filas a insertar en la tabla de unión
    const entradasRecetasCategorias = [
        { recetaId: (_a = mapaRecetas.get('Sopa de Maní')) === null || _a === void 0 ? void 0 : _a.id, categoriaId: (_b = mapaCategorias.get('sopa')) === null || _b === void 0 ? void 0 : _b.id },
        { recetaId: (_c = mapaRecetas.get('Chairo')) === null || _c === void 0 ? void 0 : _c.id, categoriaId: (_d = mapaCategorias.get('desayuno')) === null || _d === void 0 ? void 0 : _d.id },
        { recetaId: (_e = mapaRecetas.get('Chairo')) === null || _e === void 0 ? void 0 : _e.id, categoriaId: (_f = mapaCategorias.get('aperitivo')) === null || _f === void 0 ? void 0 : _f.id },
    ];
    // 4. Comprueba e inserta cada entrada una por una
    for (const entrada of entradasRecetasCategorias) {
        try {
            const relacionExistente = yield recetasCategorias_1.default.findOne({
                where: {
                    recetaId: entrada.recetaId,
                    categoriaId: entrada.categoriaId
                }
            });
            if (!relacionExistente) {
                yield recetasCategorias_1.default.create(entrada);
            }
        }
        catch (error) {
            console.error('Ocurrió un error al procesar la entrada', entrada, 'Error:', error);
        }
    }
});
//# sourceMappingURL=assignations.js.map