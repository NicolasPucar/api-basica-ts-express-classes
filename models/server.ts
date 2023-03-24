import  express, {Application}  from "express";
import userRoutes from '../routes/usuario'
import cors from 'cors';
import { dbConnection } from '../database/config';

class Server {
   private app: Application
   private port: string
   private apiPaths = {
    usuarios: '/api/usuarios'
   }
    constructor(){
        this.app = express()
        this.port = process.env.PORT || "8000"
        this.middlewares()
        this.routes()
        this.dbConnection()
    }
    // CONECTAR A DATABASE, podrias ser más de una

    async dbConnection(){
       await dbConnection()
    }


    middlewares (){

        //CORS
        this.app.use ( cors() )
        //Parseo/Lectura del Body
        this.app.use ( express.json() )
        //carpeta pública
        this.app.use ( express.static('public') )
    }


    routes () {

        this.app.use ( this.apiPaths.usuarios, userRoutes )
    }


    listen (){
        this.app.listen( this.port, () => { 
            console.log (`Servidor corriendo en el Puerto ${this.port}`)
         })
    }
}

export default Server