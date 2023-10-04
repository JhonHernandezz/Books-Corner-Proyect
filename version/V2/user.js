import { con } from "../../helpers/config/connect.js";
import { validationResult } from "express-validator";

let db = await con()

export let getAllUserEmploye = async(req, res) => {
    try {
        let tabla = db.collection("user")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        role: /Customer/
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        ).toArray();

        res.send(data)
        
    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export let getIDUserEmployee = async(req, res) => {
    try {
        let id = req.params.id
        id = parseInt(id)

        let tabla = db.collection("user")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        nit: id,
                        role: /Customer/
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        ).toArray();

        res.send(data)
        
    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export let getConsultarIDUserEmployee = async(req, res) => {
    try {
        let NIT = req.params.nit
        NIT = parseInt(NIT)

        let tabla = db.collection("user")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        nit: NIT
                    }
                },
                {
                    $project: {
                        _id: 0,
                        permisos: 0
                    }
                }
            ]
        ).toArray();

        res.send(data)
        
    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export let getNameUserEmployee = async(req, res) => {
    try {
        let name = req.params.name

        let tabla = db.collection("user")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        name: { $regex: `${name}`, $options: "i" },
                        role: /Customer/
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        ).toArray();

        res.send(data)
        
    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

/*
    {
        "nit": 1234667,
        "password": "123.0.",
        "name": "Jhon Hernandez",
        "phone": "+57 3005559677",
        "address": "Calle 11B # 1A - 20",
        "email": "Jhon.1899@gmail"
    }
*/
export let postUserCustomerEmployee = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let tabla = db.collection("user")

        if(Object.keys(req.body).length === 0) return res.status(200).send({status: 203, message: 'Enviar toda la data'})

        let NIT = parseInt(req.body.nit)
        let ROL = "Customer"
        let PERMISOS = {
            "/loan": ["1.0.0"]
        }
        
        let consultarNIT = await tabla.findOne(
            {
                nit: NIT
            }
        )

        if (consultarNIT) return res.status(200).send({status: 200, message: 'Este usuario ya existe'})

        let role = req.body.role
        let nit = parseInt(req.body.nit)

        let Password = req.body.password
        let Name = req.body.name
        let Phone = req.body.phone
        let Address = req.body.address
        let Email = req.body.email

        await tabla.insertOne(
            {
                role: role,
                nit: nit,
                password: Password,
                name: Name,
                phone: Phone,
                address: Address,
                email: Email,
                permisos: PERMISOS
            }
        )

        res.status(200).send({status: 201, message: "Registro creado con exito"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de ingresar el registro"})
    }
}

/*
    {
        "nit": 1234667,
        "password": "123.0.",
        "name": "Jhon Hernandez",
        "phone": "+57 3005559677",
        "address": "Calle 11B # 1A - 20",
        "email": "Jhon.1899@gmail"
    }
*/
export let putUserEmployee = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let id = req.params.dni
        id = parseInt(id)

        let collection = db.collection("user")
        await collection.updateOne(
            { nit: id },
            { $set: req.body }
        )

        res.status(200).send({status: 200, message: "Registro actualizado exitosamente"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de actualizar el registro"})
    }
}