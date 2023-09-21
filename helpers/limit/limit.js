import { rateLimit } from "express-rate-limit";

export let limitPeticiones = () => {
    return rateLimit({
        windowMs: 10 * 1000,
        max: 5,
        message: (req, res) => {
            res.status(429).send({status: 429, message: "Ha alcanzado el limite de peticiones permitidas, espera un poco"})
        }
    })
}

export let limitSesion = () => {
    return rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 5, 
        message: (req, res) => {
            res.status(429).send({status: 429, message: "Ha alcanzado el limite permitido, espera 1 hora"})
        }
    })
}