import Usuario from './usuario';
import Receta from './recetas';
import Favorita from './favoritas';
import Like from './like';
import Categoria from './categorias';
import RecetasCategorias from './recetasCategorias';

// Usuario - Receta - Favorita- Like
Usuario.hasMany(Receta, { foreignKey: 'usuarioId' });
Usuario.hasMany(Favorita, { foreignKey: 'usuarioId' });
Usuario.belongsToMany(Receta, { through: Favorita, as: 'recetasFavoritas', foreignKey: 'usuarioId' });

Receta.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Receta.hasMany(Favorita, { foreignKey: 'recetaId' });
Receta.belongsToMany(Usuario, { through: Favorita, as: 'usuarios', foreignKey: 'recetaId' });

Favorita.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Favorita.belongsTo(Receta, { foreignKey: 'recetaId' });

Receta.belongsToMany(Usuario, {
  through: Like,
  foreignKey: 'recetaId',
  as: 'usuariosQueGustan',
});

Usuario.belongsToMany(Receta, {
  through: Like,
  foreignKey: 'usuarioId',
  as: 'recetasGustadas',
});

Receta.belongsToMany(Categoria, {
  through: RecetasCategorias,
  foreignKey: 'recetaId',
  otherKey: 'categoriaId',
  as: 'categorias',
});

Categoria.belongsToMany(Receta, {
  through: RecetasCategorias,
  foreignKey: 'categoriaId',
  otherKey: 'recetaId',
  as: 'recetas',
});
