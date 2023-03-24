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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoDB_CNN = process.env.MONGODB_CNN;
        if (!mongoDB_CNN) {
            throw new Error('La variable de entorno MONGODB_CNN no está definida');
        }
        yield mongoose_1.default.connect(mongoDB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos Online');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map