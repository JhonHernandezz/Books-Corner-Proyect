import { con } from "../../helpers/config/connect.js";
import { Router } from "express";
import { validateUser } from "../../helpers/validator/user.js";
import { limitPeticiones } from "../../helpers/limit/limit.js";
import { validationResult } from "express-validator";

let db = await con();
let storagePostCustomer = Router()

/*
    {
        "nit": 1234667,
        "password": "123.0.", 1
        "name": "Jhon Hernandez", 1
        "phone": "+57 3005559677",
        "address": "Calle 11B # 1A - 20",
        "email": "Jhon.1899@gmail" 1
    }
*/
storagePostCustomer.post("/", limitPeticiones(), validateUser, async(req, res) => {
    try {

        let {nit, name, phone, address, email, password} = req.body

        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let tabla = db.collection("user")

        let NIT = parseInt(nit)

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
                nit: NIT,
                name: name,
                phone: phone,
                address: address,
                email: email,
                password: password,
                role: ROL,
                permisos: PERMISOS
            }
        )

        res.status(200).send({status: 201, message: "Registro creado con exito"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos del formulario"})
    }
})

export default storagePostCustomer