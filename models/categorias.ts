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


export async function initializeCategorias() {
  const categoriasPorDefecto = [
    'sopa',
    'desayuno',
    'aperitivo',
    'principal',
    'postre',
    'compartir',
    'bebidas',
    'vegetariano',
    'glutenFree',
    'caliente',
    'frío',
    'Boliviano Tradicional', // Otras categorías que se te ocurran...
    'Rápido y Fácil',
    'Bajo en Calorías'
  ];

  for (const nombre of categoriasPorDefecto) {
    // Esto creará la categoría si no existe aún
    await Categoria.findOrCreate({ where: { nombre } });
  }
}