
import { Request, Response } from "express"

import Usuario from '../models/usuario'

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.find();
    res.json({
    usuarios
    })
    }

export const getUsuario = (req: Request, res: Response) => {
    const {id} = req.params

    res.json({ 
        msg: "getUsuario",
        id
    })
    }

export const postUsuario =  async (req: Request, res: Response) => {
    const body = req.body
    const usuario = new Usuario(body)
    await usuario.save()
    res.json({
        msg: "postUsuario",
        body,
        usuario
    })
    }

export const putUsuario = (req: Request, res: Response) => {
    const {id} = req.params
    const {body} = req

    res.json({
    msg: "putUsuario",
    body,
    id
        })
        }

export const deleteUsuario = (req: Request, res: Response) => {
    const {id} = req.params
    res.json({
    msg: "deleteUsuario",
    id
    })
    }


