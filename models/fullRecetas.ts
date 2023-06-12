import { Model, DataTypes } from 'sequelize';
import db from '../database/config';
import Receta from './recetas';

class FullReceta extends Model {
  public id!: number;
  public nombre!: string;
  public imagen!: string;
  public descripcion!: string;
  public tiempoPreparacion!: number;
  public ingredientes!: string[];
  public pasos!: string[];
  public porciones!: number;
  public tipoComida!: string[];
  public estado!: boolean;
  public usuarioId!: number | null;
}

FullReceta.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
      get() {
        return JSON.parse(this.getDataValue('ingredientes'));
      },
      set(val) {
        this.setDataValue('ingredientes', JSON.stringify(val));
      },
    },
    pasos: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue('pasos'));
      },
      set(val) {
        this.setDataValue('pasos', JSON.stringify(val));
      },
    },
    porciones: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    tipoComida: {
      type: DataTypes.ARRAY(DataTypes.STRING(40)),
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
    modelName: 'FullReceta',
  }
);

export default FullReceta;

export async function populateFullReceta() {
  const recetas = await Receta.findAll();
  for (let receta of recetas) {
    const existingFullReceta = await FullReceta.findByPk(receta.id);
    if (existingFullReceta) {
      console.log(`FullReceta with id ${receta.id} already exists. Skipping...`);
      continue;
    }
    await mostrarRecetaYsusCategorias(receta.id);
  }
}

async function mostrarRecetaYsusCategorias(idReceta: number): Promise<FullReceta> {
  const receta = await Receta.findByPk(idReceta);

  if (!receta) {
    console.log('Receta no encontrada');
    return new FullReceta();
  }

  const categorias = await receta.getCategorias();
  const categoriasSimples = categorias.map(categoria => ({
    id: categoria.id,
    tipoComida: categoria.nombre,
  }));

  const catstring = () => {
    let result = [];
    for (let i = 0; i < categoriasSimples.length; i++) {
      result.push(categoriasSimples[i].tipoComida.toString());
    }
    return result;
  };

  try {
    const recetaJoined = await FullReceta.create({
      id: receta.id,
      nombre: receta.nombre,
      descripcion: receta.descripcion,
      imagen: receta.imagen,
      tiempoPreparacion: receta.tiempoPreparacion,
      porciones: receta.porciones,
      ingredientes: receta.ingredientes,
      pasos: receta.pasos,
      tipoComida: catstring(),
      estado: receta.estado,
    });
    return recetaJoined;
  } catch (error) {
    console.error('Error al crear la FullReceta:', error);
    return new FullReceta();
  }
}
