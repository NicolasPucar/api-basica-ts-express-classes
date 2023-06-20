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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const db_validators_1 = require("../helpers/db-validators");
const validar_JWT_1 = require("../middlewares/validar-JWT");
const validar_Roles_1 = require("../middlewares/validar-Roles");
const favoritas_1 = __importDefault(require("../models/favoritas"));
const recetas_1 = __importDefault(require("../models/recetas"));
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.get('/:id/recetas_favoritas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.params.id;
    try {
        let recetasFavoritas = yield favoritas_1.default.findAll({
            where: { usuarioId: usuarioId },
            include: [
                {
                    model: recetas_1.default,
                    as: 'receta'
                },
            ],
        });
        res.status(200).send(recetasFavoritas);
    }
    catch (error) {
        res.status(500).send({ message: 'Ocurrió un error al recuperar las recetas favoritas.' });
    }
}));
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre no puede estar vacío').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El email introducido no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailValidator),
    (req, res, next) => {
        if (!req.body.rol) {
            req.body.rol = 'USER_ROLE';
        }
        next();
    },
    (0, express_validator_1.check)('rol', 'El rol introducido no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos_1.validarCampos
], usuarios_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.idValidator),
    validarCampos_1.validarCampos
], usuarios_1.putUsuario);
router.delete('/:id', [
    validar_JWT_1.validarJWT,
    validar_Roles_1.esAdminRole,
    (0, express_validator_1.check)('id').custom(db_validators_1.idValidator),
    validarCampos_1.validarCampos
], usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map