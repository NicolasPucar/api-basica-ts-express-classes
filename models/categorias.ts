import { Model, DataTypes } from 'sequelize';
import db from '../database/config';

class Categoria extends Model {
  public id!: number;
  public nombre!: string;
}

Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Categoria',
  }
);

export default Categoria;
