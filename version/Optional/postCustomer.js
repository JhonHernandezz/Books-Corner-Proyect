import { con } from "../../helpers/config/connect.js";
import { Router } from "express";
import { validateUser } from "../../helpers/validator/user.js";
import { limitPeticiones } from "../../helpers/limit/limit.js";
import { validationResult } from "express-validator";

let db = await con();
let storagePostCustomer = Router()

storagePostCustomer.post("/", limitPeticiones(), validateUser, async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let tabla = db.collection("user")

        if(Object.keys(req.body).length === 0) return res.status(200).send({status: 203, message: 'Enviar toda la data'})

        let NIT = req.body.nit
        let ROL = "Customer"
        let PERMISOS = {
            "/loan": ["1.0.0"],
        }
        
        let consultarNIT = await tabla.findOne(
            {
                nit: NIT
            }
        )

        if (consultarNIT) return res.status(200).send({status: 200, message: 'Este usuario ya existe'})

        await tabla.insertOne(
            {
                role: ROL,
                ...req.body,
                permisos: PERMISOS
            }
        )

        res.status(200).send({status: 201, message: "Registro creado con exito"})

    } catch (error) {
        res.status(200).send({status: 203, message: error.message})
    }
})

export default storagePostCustomer