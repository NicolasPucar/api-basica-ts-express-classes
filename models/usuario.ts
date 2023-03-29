import { DataTypes } from "sequelize";
import db from "../database/config";

const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },  
    email: { 
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    password: {
        type: DataTypes.STRING
    }
})
    
export default Usuario

// sobreescribimos el toJSON para que no devuelva el password

Usuario.prototype.toJSON = function() {
    const { password, ...usuario } = this.get();
    return usuario;
}

