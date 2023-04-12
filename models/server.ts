import express, {Application} from "express";
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db, {initDatabase} from "../database/config";
import {router} from "../routes/auth";


class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    auth: '/api/auth',
    usuarios: '/api/usuarios'
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.dbConnection();
    this.middlewares();
    this.routes();
    this.initDatabase();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Conexión a la base de datos establecida.');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      throw new Error('Error al iniciar la base de datos');
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Parseo/Lectura del Body
    this.app.use(express.json());

    //carpeta pública
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.auth, router);
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  async initDatabase() {
    await initDatabase();
  }

  listen() {
    this.app.listen(parseInt(this.port), '0.0.0.0', () => {
      console.log(`Servidor corriendo en el Puerto ${this.port}`);
    });
  }
}

export default Server;
