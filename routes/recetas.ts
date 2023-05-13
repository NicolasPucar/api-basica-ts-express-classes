import express, { Request, Response } from 'express';
import Receta from '../models/recetas';

const router = express.Router();

// Obtener todas las recetas
router.get('/', async (req: Request, res: Response) => {
  try {
    const recetas = await Receta.findAll();
    res.status(200).json({ ok: true, recetas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error al obtener las recetas' });
  }
});

// Obtener una receta específica
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const receta = await Receta.findByPk(id);
    if (!receta) {
      return res.status(404).json({ ok: false, msg: 'Receta no encontrada' });
    }
    res.status(200).json({ ok: true, receta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error al obtener la receta' });
  }
});

// Crear una nueva receta
router.post('/', async (req: Request, res: Response) => {
  try {
    const receta = await Receta.create(req.body);
    res.status(201).json({ ok: true, receta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error al crear la receta' });
  }
});

// Actualizar una receta existente
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Receta.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedReceta = await Receta.findByPk(id);
      return res.status(200).json({ ok: true, receta: updatedReceta });
    }
    throw new Error('Receta no encontrada');
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error al actualizar la receta' });
  }
});

// Eliminar una receta existente
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Receta.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(200).json({ ok: true, msg: 'Receta eliminada exitosamente' });
    }
    throw new Error('Receta no encontrada');
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error al eliminar la receta' });
  }
});

export default router;
