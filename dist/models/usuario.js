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
exports.initDatabase = exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("sequelize");
const db = new sequelize_3.Sequelize('usuariosrecetas', 'root', 'Aeropress23.', {
    host: process.env.MYSQL_ADDON_HOST || 'localhost',
    dialect: 'mysql',
    port: parseInt(process.env.MYSQL_ADDON_PORT || '3306')
});
class Usuario extends sequelize_1.Model {
}
exports.Usuario = Usuario;
Usuario.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_2.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    rol: {
        type: sequelize_2.DataTypes.STRING,
        defaultValue: 'USER_ROLE'
    }
}, {
    sequelize: db,
    modelName: 'Usuario'
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
//# sourceMappingURL=usuario.js.map