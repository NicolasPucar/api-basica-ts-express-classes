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
const axios_1 = __importDefault(require("axios"));
const likeButton = document.getElementById('likeButton');
likeButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recetaId = '123'; // ID de la receta a la que se está dando "Me gusta"
        const response = yield axios_1.default.post(`/api/recetas/${recetaId}/like`);
        const { success, count } = response.data;
        if (success) {
            // Actualizar la interfaz de usuario (por ejemplo, cambiar el estado visual del botón y actualizar el conteo de "Me gusta")
            likeButton.classList.add('liked');
            likeButton.innerText = 'Liked';
            const countElement = document.getElementById('likeCount');
            countElement.innerText = count.toString();
        }
    }
    catch (error) {
        console.error(error);
        // Manejar errores y mostrar mensajes al usuario
    }
}));
A;
//# sourceMappingURL=likefront.js.map