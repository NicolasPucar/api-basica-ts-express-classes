import db from './config';

export async function initDatabase() {
  try {
    await db.authenticate();
    console.log('Conexión a la base de datos establecida.');

    //Elimina la base de datos si existe
    await db.query('DROP DATABASE IF EXISTS usuariosrecetas');

    // Crea la base de datos si no existe
    await db.query('CREATE DATABASE IF NOT EXISTS usuariosrecetas');

    // Selecciona la base de datos
    await db.query('USE usuariosrecetas');

    // Sincroniza los modelos con la base de datos
    await db.sync();

    console.log('Base de datos y tablas creadas exitosamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}
