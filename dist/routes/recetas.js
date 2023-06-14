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
const express_1 = __importDefault(require("express"));
const recetas_1 = __importDefault(require("../models/recetas"));
const recetaValidator_1 = require("../helpers/recetaValidator");
const like_1 = __importDefault(require("../models/like"));
const sequelize_1 = require("sequelize");
const categorias_1 = __importDefault(require("../models/categorias"));
const recetasCategorias_1 = __importDefault(require("../models/recetasCategorias"));
const validar_JWT_1 = require("../middlewares/validar-JWT");
const sequelize_2 = __importDefault(require("sequelize"));
const router = express_1.default.Router();
// Manejo de errores
const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
};
// Obtener todas las recetas
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipoComida } = req.query;
        let recetas;
        if (tipoComida) {
            // Filtrar las recetas por la categoría especificada
            console.log(tipoComida, 'desde routes');
            recetas = yield recetasCategorias_1.default.findAll({
                where: {
                    categoriaId: tipoComida,
                },
            });
        }
        else {
            // Obtener todas las recetas sin filtrar
            recetas = yield recetas_1.default.findAll();
        }
        res.status(200).json({ success: true, data: recetas });
    }
    catch (error) {
        next(error);
    }
}));
// Obtener recetas por categoría
router.get('/categoria/:nombre', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const recetas = yield recetas_1.default.findAll({
            include: [
                {
                    model: categorias_1.default,
                    as: 'categorias',
                    where: {
                        nombre: {
                            [sequelize_1.Op.like]: nombre,
                        },
                    },
                },
            ],
        });
        res.status(200).json({ success: true, data: recetas });
    }
    catch (error) {
        next(error);
    }
}));
// Crear una nueva receta
router.post('/', recetaValidator_1.validateCreateReceta, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receta = yield recetas_1.default.create(req.body);
        res.status(201).json({ success: true, data: receta });
    }
    catch (error) {
        next(error);
    }
}));
// Actualizar una receta existente
router.put('/:id', recetaValidator_1.validateUpdateReceta, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [updated] = yield recetas_1.default.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedReceta = yield recetas_1.default.findByPk(id);
            return res.status(200).json({ success: true, data: updatedReceta });
        }
        throw new Error('Receta no encontrada');
    }
    catch (error) {
        next(error);
    }
}));
// Dar "Me gusta" a una receta específica
router.post('/:id/like', validar_JWT_1.validarJWT, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const receta = yield recetas_1.default.findByPk(id);
        if (!receta) {
            return res.status(404).json({ success: false, error: 'Receta no encontrada' });
        }
        // Utiliza el id del usuario autenticado extraído del token JWT
        const userId = (_a = req.usuario) === null || _a === void 0 ? void 0 : _a.id;
        const existingLike = yield like_1.default.findOne({
            where: { usuarioId: userId, recetaId: receta.id },
        });
        if (existingLike) {
            return res.status(400).json({ success: false, error: 'Ya has dado "Me gusta" a esta receta' });
        }
        // Crear un nuevo registro de "Me gusta"
        const newLike = yield like_1.default.create({
            usuarioId: userId,
            recetaId: receta.id,
        });
        res.status(201).json({ success: true, message: '¡Me gusta agregado!', data: newLike });
    }
    catch (error) {
        next(error);
    }
}));
// Obtener las recetas con más likes
// Obtener todas las recetas, ordenadas por el número de likes
router.get('/top', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recetas = yield recetas_1.default.findAll({
            attributes: {
                include: [
                    [sequelize_2.default.fn('COUNT', sequelize_2.default.col('likes.recetaId')), 'likeCount']
                ]
            },
            include: [
                {
                    model: like_1.default,
                    as: 'likes',
                    attributes: []
                }
            ],
            group: ['Receta.id'],
            order: [[sequelize_2.default.literal('likeCount'), 'DESC']]
        });
        res.status(200).json({ success: true, data: recetas });
    }
    catch (error) {
        next(error);
    }
}));
// Eliminar una receta existente
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield recetas_1.default.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Receta eliminada exitosamente' });
        }
        throw new Error('Receta no encontrada');
    }
    catch (error) {
        next(error);
    }
}));
// Agregar middleware de manejo de errores
router.use(errorHandler);
exports.default = router;
//# sourceMappingURL=recetas.js.map