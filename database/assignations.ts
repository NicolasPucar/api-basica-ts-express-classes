import Categoria from "../models/categorias";
import Receta from "../models/recetas";
import RecetasCategorias from "../models/recetasCategorias";

export default async () => {
// 1. Carga todas las recetas y categorías por adelantado
const recetas = await Receta.findAll();
const todasLasCategorias = await Categoria.findAll();

// 2. Crea un mapa de categorías por nombre y de recetas para un acceso más fácil
const mapaCategorias = new Map(todasLasCategorias.map(categoria => [categoria.nombre, categoria]));
const mapaRecetas = new Map(recetas.map(receta => [receta.nombre, receta]));

// 3. Construye un array de objetos que representen las filas a insertar en la tabla de unión
const entradasRecetasCategorias = [
    { recetaId: mapaRecetas.get('Sopa de Maní')?.id, categoriaId: mapaCategorias.get('sopa')?.id!},
    { recetaId: mapaRecetas.get('Chairo')?.id, categoriaId: mapaCategorias.get('desayuno')?.id!},
    { recetaId: mapaRecetas.get('Chairo')?.id, categoriaId: mapaCategorias.get('aperitivo')?.id!},
];

// 4. Comprueba e inserta cada entrada una por una
for (const entrada of entradasRecetasCategorias) {
    try {
            const relacionExistente = await RecetasCategorias.findOne({
                where: {
                    recetaId: entrada.recetaId,
                    categoriaId: entrada.categoriaId
                }
            });
            
            if (!relacionExistente) {
                await RecetasCategorias.create(entrada);
            }
        } catch (error) {
            console.error('Ocurrió un error al procesar la entrada', entrada, 'Error:', error);
        }
    }
}

