import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    uid?: string;
    name?: string;
}

interface IPayload {
    uid: string;
    name: string;
}

export const validarJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRETORPRIVATEKEY) as IPayload;
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
};
