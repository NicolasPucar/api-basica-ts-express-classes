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

}

FullReceta.init(
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

export async function populateFullReceta(){
    const recetas = await Receta.findAll();
    for (let receta of recetas){
       await FullReceta.create( await mostrarRecetaYsusCategorias(receta.id) as any);
    }
}

async function mostrarRecetaYsusCategorias(idReceta: number):Promise<FullReceta> {
    const receta = await Receta.findByPk(idReceta);
    
    if (!receta) {
      console.log('Receta no encontrada');
      return new FullReceta();
    }
    const categorias = await receta.getCategorias();
    // Mapear cada categoria a un objeto que solo contiene "id" y "nombre"
    const categoriasSimples = categorias.map(categoria => ({
      id: categoria.id,
      tipoComida: categoria.nombre,
    }));
    let catstring = ()=>{
        let result = [];
        for(let i = 0; i < categoriasSimples.length; i++){
            result.push(categoriasSimples[i].tipoComida.toString());
        }
        return result;
    }
    let recetaJoined = await FullReceta.create({ 
        id: receta.id,
        nombre: receta.nombre,
        descripcion: receta.descripcion,
        imagen: receta.imagen,
        tiempoPreparacion: receta.tiempoPreparacion,
        porciones: receta.porciones,
        ingredientes: receta.ingredientes,
        pasos: receta.pasos,
        tipoComida:catstring(),
        estado: receta.estado,
    });
    let fullRecipe = recetaJoined;
    return fullRecipe;
  }