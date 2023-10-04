import { con } from "../../helpers/config/connect.js";
import { validationResult } from "express-validator";

let db = await con()

export let getAllUser = async(req, res) => {
    try {
        let tabla = db.collection("user")
        let data = await tabla.aggregate([
            {
                $match:{
                    role: { $in: ['Customer', 'Employee'] }
                }
            }
        ]).toArray();

        res.send(data)
        
    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export let getIDUser = async(req, res) => {
    try {
        let { NIT } = req.data.payload

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

export let getConsultarIDUser = async(req, res) => {
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

export let getANameUser = async(req, res) => {
    try {
        let name = req.params.name

        let tabla = db.collection("user")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        name:  { $regex: `${name}`, $options: "i" }
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
export let postUserEmployee = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let tabla = db.collection("user")

        if(Object.keys(req.body).length === 0) return res.status(200).send({status: 203, message: 'Enviar toda la data'})
                
        let Role = req.body.role
        let NIT = req.body.nit
        NIT = parseInt(NIT)

        let Password = req.body.password
        let Name = req.body.name
        let Phone = req.body.phone
        let Address = req.body.address
        let Email = req.body.email

        let PERMISOS = {
            "/user": ["2.0.0"],
            "/book": ["2.0.0"],
            "/loan": ["2.0.0"],
            "/reservation": ["2.0.0"]
        }
        
        let consultarNIT = await tabla.findOne(
            {
                nit: NIT
            }
        )

        if (consultarNIT) return res.status(200).send({status: 200, message: 'Este usuario ya existe'})

        await tabla.insertOne(
            {
                role: Role,
                nit: NIT,
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
        res.status(200).send({status: 203, message: "Error en los datos al momento de ingresar el registro, no dejar ningun espacio al final"})
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
export let postUserCustomer = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let tabla = db.collection("user")

        if(Object.keys(req.body).length === 0) return res.status(200).send({status: 203, message: 'Enviar toda la data'})

        let Role = req.body.role
        let NIT = req.body.nit
        NIT = parseInt(NIT)

        let Password = req.body.password
        let Name = req.body.name
        let Phone = req.body.phone
        let Address = req.body.address
        let Email = req.body.email

        let PERMISOS = {
            "/loan": ["1.0.0"]
        }
        
        let consultarNIT = await tabla.findOne(
            {
                nit: NIT
            }
        )

        if (consultarNIT) return res.status(200).send({status: 200, message: 'Este usuario ya existe'})

        await tabla.insertOne(
            {
                role: Role,
                nit: NIT,
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
        res.status(200).send({status: 203, message: "Error en los datos al momento de ingresar el registro, no dejar ningun espacio al final"})
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
export let putUser = async(req, res) => {
    try {

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

export let deleteUser = async(req, res) => {
    try {

        let id = req.params.dni
        id = parseInt(id)

        let collection = db.collection("user")
        let respuesta = await collection.deleteOne({ nit: id })

        res.status(200).send({status: 200, message: "Registro eliminado exitosamente"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error al eliminar el registro"})
    }
}