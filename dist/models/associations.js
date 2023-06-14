"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("./usuario"));
const recetas_1 = __importDefault(require("./recetas"));
const favoritas_1 = __importDefault(require("./favoritas"));
const like_1 = __importDefault(require("./like"));
const categorias_1 = __importDefault(require("./categorias"));
const recetasCategorias_1 = __importDefault(require("./recetasCategorias"));
const fullRecetas_1 = __importDefault(require("./fullRecetas"));
// Usuario - Receta - Favorita- Like
usuario_1.default.hasMany(recetas_1.default, { foreignKey: 'usuarioId' });
usuario_1.default.hasMany(favoritas_1.default, { foreignKey: 'usuarioId' });
usuario_1.default.belongsToMany(recetas_1.default, { through: favoritas_1.default, as: 'recetasFavoritas', foreignKey: 'usuarioId' });
recetas_1.default.belongsTo(usuario_1.default, { foreignKey: 'usuarioId' });
recetas_1.default.hasMany(favoritas_1.default, { foreignKey: 'recetaId' });
recetas_1.default.belongsToMany(usuario_1.default, { through: favoritas_1.default, as: 'usuarios', foreignKey: 'recetaId' });
favoritas_1.default.belongsTo(usuario_1.default, { foreignKey: 'usuarioId' });
favoritas_1.default.belongsTo(recetas_1.default, { foreignKey: 'recetaId' });
recetas_1.default.belongsToMany(usuario_1.default, {
    through: like_1.default,
    foreignKey: 'recetaId',
    as: 'likes',
});
usuario_1.default.belongsToMany(recetas_1.default, {
    through: like_1.default,
    foreignKey: 'usuarioId',
    as: 'recetasGustadas',
});
recetas_1.default.belongsToMany(categorias_1.default, {
    through: recetasCategorias_1.default,
    foreignKey: 'recetaId',
    otherKey: 'categoriaId',
    as: 'categorias',
});
categorias_1.default.belongsToMany(recetas_1.default, {
    through: recetasCategorias_1.default,
    foreignKey: 'categoriaId',
    otherKey: 'recetaId',
    as: 'recetas',
});
usuario_1.default.hasMany(fullRecetas_1.default, { foreignKey: 'usuarioId' });
fullRecetas_1.default.belongsTo(usuario_1.default, { foreignKey: 'usuarioId' });
//# sourceMappingURL=associations.js.map