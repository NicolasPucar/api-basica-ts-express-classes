import express, { Request, Response, NextFunction } from 'express';
import Receta from '../models/recetas';
import { validateCreateReceta, validateUpdateReceta } from '../helpers/recetaValidator';
import like from '../models/like';
import { Op } from 'sequelize';
import Categoria from '../models/categorias';
import RecetasCategorias from '../models/recetasCategorias';
import {validarJWT,CustomRequest} from '../middlewares/validar-JWT';
import Sequelize from 'sequelize';
import Favorita from '../models/favoritas';
import Usuario from '../models/usuario';

const router = express.Router();

// Manejo de errores
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ success: false, error: 'Error interno del servidor' });
};

// Obtener todas las recetas
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tipoComida } = req.query;
    let recetas;

    if (tipoComida) {
      // Filtrar las recetas por la categoría especificada
      console.log(tipoComida, 'desde routes');
      
      recetas = await RecetasCategorias.findAll({
      
            where: {
              categoriaId:  tipoComida ,
            },
      });
    } else {
      // Obtener todas las recetas sin filtrar
      recetas = await Receta.findAll();
    }

    res.status(200).json({ success: true, data: recetas });
  } catch (error) {
    next(error);
  }
});

// Obtener recetas por categoría
router.get('/categoria/:nombre', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre } = req.params;
    const recetas = await Receta.findAll({
      include: [
        {
          model: Categoria,
          as: 'categorias',
          where: {
            nombre: {
              [Op.like]: nombre,
            },
          },
        },
      ],
    });
    res.status(200).json({ success: true, data: recetas });
  } catch (error) {
    next(error);
  }
});

// Crear una nueva receta
router.post('/', validateCreateReceta, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const receta = await Receta.create(req.body);
    res.status(201).json({ success: true, data: receta });
  } catch (error) {
    next(error);
  }
});


// Actualizar una receta existente
router.put('/:id', validateUpdateReceta, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [updated] = await Receta.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedReceta = await Receta.findByPk(id);
      return res.status(200).json({ success: true, data: updatedReceta });
    }
    throw new Error('Receta no encontrada');
  } catch (error) {
    next(error);
  }
});

// Dar "Me gusta" a una receta específica
router.post('/:id/like', validarJWT, async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const receta = await Receta.findByPk(id);

    if (!receta) {
      return res.status(404).json({ success: false, error: 'Receta no encontrada' });
    }

    // Utiliza el id del usuario autenticado extraído del token JWT
    const userId = req.usuario?.id;

    const existingLike = await like.findOne({
      where: { usuarioId: userId, recetaId: receta.id },
    });

    if (existingLike) {
      return res.status(400).json({ success: false, error: 'Ya has dado "Me gusta" a esta receta' });
    }

    // Crear un nuevo registro de "Me gusta"
    const newLike = await like.create({
      usuarioId: userId,
      recetaId: receta.id,
    });

    res.status(201).json({ success: true, message: '¡Me gusta agregado!', data: newLike });
  } catch (error) {
    next(error);
  }
});

// Obtener las recetas con más likes
// Obtener todas las recetas, ordenadas por el número de likes
router.get('/top', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recetas = await Receta.findAll({
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('likes.recetaId')), 'likeCount']
        ]
      },
      include: [
        {
          model: like,
          as: 'likes',
          attributes: []
        }
      ],
      group: ['Receta.id'],
      order: [[Sequelize.literal('likeCount'), 'DESC']]
    });

    res.status(200).json({ success: true, data: recetas });
  } catch (error) {
    next(error);
  }
});



// Eliminar una receta existente
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await Receta.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(200).json({ success: true, message: 'Receta eliminada exitosamente' });
    }
    throw new Error('Receta no encontrada');
  } catch (error) {
    next(error);
  }
});

// Marcar una receta como favorita
router.post('/:id/favorita', validarJWT, async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const receta = await Receta.findByPk(id);

    if (!receta) {
      return res.status(404).json({ success: false, error: 'Receta no encontrada' });
    }

    // Utiliza el id del usuario autenticado extraído del token JWT
    const userId = req.usuario?.id;

    if (userId === undefined) {
      return res.status(400).json({ success: false, error: 'No se pudo obtener el id del usuario' });
    }

    

    const existingFavorita = await Favorita.findOne({
      where: { usuarioId: userId, recetaId: receta.id },
    });

    if (existingFavorita) {
      return res.status(400).json({ success: false, error: 'Ya has marcado esta receta como favorita' });
    }


    // Crear un nuevo registro de receta favorita
    const newFavorita = await Favorita.create({
      
      usuarioId: userId,
      recetaId: receta.id,
    });

    res.status(201).json({ success: true, message: '¡Receta marcada como favorita!', data: newFavorita });
  } catch (error) {
    next(error);
  }
});






// Agregar middleware de manejo de errores
router.use(errorHandler);

export default router;
