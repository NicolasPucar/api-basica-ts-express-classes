import { Model, DataTypes } from 'sequelize';
import db from '../database/config';
import Receta from './recetas';
import Usuario from './usuario';


interface FavoritaAttributes {
  id?: number;
  recetaId: number;
  usuarioId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Favorita extends Model<FavoritaAttributes> implements FavoritaAttributes {
  public id!: number;
  public recetaId!: number;
  public usuarioId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Favorita.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    recetaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Favorita',
  }
);

Favorita.belongsTo(Receta, {
  foreignKey: 'recetaId',
  as: 'receta',
});

Favorita.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario',
});






export default Favorita;
