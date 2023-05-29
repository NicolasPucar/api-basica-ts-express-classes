import { Model, DataTypes } from 'sequelize';
import db from '../database/config';
import Receta from './recetas';
import Categoria from './categorias';

class RecetasCategorias extends Model {
  public recetaId!: number;
  public categoriaId!: number;
}

RecetasCategorias.init(
  {
    recetaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Receta,
        key: 'id',
      },
    },
    categoriaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Categoria,
        key: 'id',
      },
    },
  },
  {
    sequelize: db,
    modelName: 'RecetasCategorias',
    timestamps: false, // No se utilizarán timestamps en esta tabla
  }
);

export default RecetasCategorias;
