"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = void 0;
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('sql7611601', 'sql7611601', 'Il24s9kdnC', {
    host: 'sql7.freemysqlhosting.net' || 'sql7.freemysqlhosting.net',
    dialect: 'mysql',
    port: parseInt(process.env.MYSQL_ADDON_PORT || '3306')
});
function initDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.authenticate();
            console.log('Conexión a la base de datos establecida.');
            // Sincronizar los modelos con la base de datos
            yield db.sync();
            console.log('Base de datos y tablas creadas exitosamente.');
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    });
}
exports.initDatabase = initDatabase;
exports.default = db;
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
//# sourceMappingURL=config.js.map