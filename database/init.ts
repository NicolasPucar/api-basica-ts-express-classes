import db from './config';
import Categoria, { initializeCategorias } from '../models/categorias';
import Receta from '../models/recetas';
import Favorita from '../models/favoritas';
import Like from '../models/like';
import assignation from './assignations'; // Importa la función assignation
import RecetasCategorias from '../models/recetasCategorias'; // Importa el modelo RecetasCategorias
import FullReceta, { populateFullReceta } from '../models/fullRecetas';

export async function initDatabase() {
  try {
    await db.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Sincronizar los modelos con la base de datos
    await initializeCategorias();
    await Receta.sync();
    await Categoria.sync();
    await RecetasCategorias.sync(); // Sincroniza el modelo RecetasCategorias
    await assignation();
    await Favorita.sync();
    await populateFullReceta();
    await Like.sync();
    await FullReceta.sync();
    console.log('Base de datos y tablas creadas exitosamente.');
      // Asignar categorías a una receta

    console.log('Categorías asignadas a la receta exitosamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

