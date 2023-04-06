import { Model, Optional } from 'sequelize';
import { DataTypes } from 'sequelize';
import { Sequelize } from "sequelize";

const db = new Sequelize('usuariosrecetas' , 'root', 'Aeropress23.', {
    host: process.env.MYSQL_ADDON_HOST || 'localhost',
    dialect: 'mysql',
    port: parseInt(process.env.MYSQL_ADDON_PORT || '3306')
});

interface UsuarioAttributes {
  id: number;
  nombre: string;
  email: string;
  password: string;
  estado: boolean;
  rol: string;
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id'> {}

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public estado!: boolean;
  public rol!: string;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: 'USER_ROLE'
    }
    
  },
  {
    sequelize: db,
    modelName: 'Usuario'
  }
);

export { Usuario, UsuarioAttributes };

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
