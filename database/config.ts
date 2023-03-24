 import mongoose from 'mongoose'


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
 