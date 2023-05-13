import { Model, DataTypes } from 'sequelize';
import db from '../database/config';



class Like extends Model {
    public id!: number;
    public usuarioId!: number;
    public recetaId!: number;
  }
  
  Like.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      usuarioId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      recetaId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: 'Like',
    }
  );
  
  export default Like;
  