import { Sequelize } from "sequelize";

const db = new Sequelize('railway' , 'root', '8RhUHoMS39nq93A40iH1', {
  host: 'containers-us-west-9.railway.app' || 'localhost:8000',
  dialect: 'mysql',
  port: parseInt('7366' || '3306')
});


export async function initDatabase() {
  try {
    await db.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Sincronizar los modelos con la base de datos
    await db.sync();

    console.log('Base de datos y tablas creadas exitosamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

export default db;










/* export const dbConnection = async () => {

    try {
      const mongoUri = process.env.MONGODB_CNN;
      await mongoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      
    } catch (error) {
        console.log(error)
        throw new Error ('Error al iniciar la base de datos')
    }
}
  */

/* 

export const dbConnection = async (): Promise<void> => {
  
  try {
    
    const mongoDB_CNN = process.env.MONGODB_CNN;
    if (!mongoDB_CNN) {
      throw new Error('La variable de entorno MONGODB_CNN no está definida');
    }

    await mongoose.connect(mongoDB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
      
    console.log('Base de datos Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar la base de datos');
  }
};
  */

/*       
export const dbConnection = async (): Promise<void> => {
    
    try {
      
      const mongoDB_CNN = process.env.MONGODB_CNN;
      if (!mongoDB_CNN) {
        throw new Error('La variable de entorno MONGODB_CNN no está definida');
      }
  
      await mongoose.createConnection(mongoDB_CNN);
        
      console.log('Base de datos Online');
    } catch (error) {
      console.log(error);
      throw new Error('Error al iniciar la base de datos');
    }
  }; */