import { Model, DataTypes } from 'sequelize';
import db from '../database/config';
import Categoria from './categorias';
import Like from './like';
import RecetasCategorias from './recetasCategorias';
class Receta extends Model {
  public id!: number;
  public usuarioId!: number;
  public nombre!: string;
  public imagen!: string;
  public descripcion!: string;
  public tiempoPreparacion!: number;
  public ingredientes!: string[];
  public pasos!: string[];
  public porciones!: number;
  public tipoComida!: Categoria[];
  public estado!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  public getCategorias!: () => Promise<Categoria[]>;
  public addCategorias!: (categorias: Categoria[]) => Promise<void>;
}

Receta.init(
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
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tiempoPreparacion: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    ingredientes: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function() {
        return JSON.parse(this.getDataValue('ingredientes'));
      },
      set: function(val) {
        this.setDataValue('ingredientes', JSON.stringify(val));
      }
    },
    pasos: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function() {
        return JSON.parse(this.getDataValue('pasos'));
      },
      set: function(val) {
        this.setDataValue('pasos', JSON.stringify(val));
      }
    },
    porciones: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    tipoComida: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Receta',
  }
);


Receta.belongsToMany(Categoria, { through: RecetasCategorias });

export default Receta;
