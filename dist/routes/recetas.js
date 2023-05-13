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
const router = express_1.default.Router();
// Obtener todas las recetas
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recetas = yield recetas_1.default.findAll();
        res.status(200).json({ ok: true, recetas });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener las recetas' });
    }
}));
// Obtener una receta específica
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const receta = yield recetas_1.default.findByPk(id);
        if (!receta) {
            return res.status(404).json({ ok: false, msg: 'Receta no encontrada' });
        }
        res.status(200).json({ ok: true, receta });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener la receta' });
    }
}));
// Crear una nueva receta
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receta = yield recetas_1.default.create(req.body);
        res.status(201).json({ ok: true, receta });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al crear la receta' });
    }
}));
// Actualizar una receta existente
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [updated] = yield recetas_1.default.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedReceta = yield recetas_1.default.findByPk(id);
            return res.status(200).json({ ok: true, receta: updatedReceta });
        }
        throw new Error('Receta no encontrada');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar la receta' });
    }
}));
// Eliminar una receta existente
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield recetas_1.default.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(200).json({ ok: true, msg: 'Receta eliminada exitosamente' });
        }
        throw new Error('Receta no encontrada');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al eliminar la receta' });
    }
}));
exports.default = router;
//# sourceMappingURL=recetas.js.map