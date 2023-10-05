import { con } from "../../helpers/config/connect.js";
import { autoIncrement } from "../../helpers/autoincrement/autoincrement.js";
import { validationResult } from "express-validator";

let db = await con()

export let getAllBookEmployee = async(req, res) => {
    try {
        let tabla = db.collection("book")
        let data = await tabla.aggregate(
            [
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        ).toArray()

        res.send(data)

    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export let getIDBookEmployee = async(req, res) => {
    try {

        let id = req.params.id
        id = parseInt(id)

        let tabla = db.collection("book")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        id: id
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        ).toArray()

        res.send(data)

    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export let getNameBookEmployee = async(req, res) => {
    try {
        let name = req.params.name

        let tabla = db.collection("book")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        name:  { $regex: `${name}`, $options: "i" }
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        ).toArray()

        res.send(data)

    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export let getCategorieBookEmployee = async(req, res) => {
    try {
        let categorie = req.params.categorie

        let tabla = db.collection("book")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        categorie:  { $regex: `${categorie}`, $options: "i" }
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        ).toArray()

        res.send(data)

    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

/*
    {
        "name": "El Señor de los Anillos: La Comunidad del Anillo",
        "photo": "https://th.bing.com/th/id/R.d60f3156fb891e7a61332ffa0d60c8d2?rik=ScDaV7tU6T804g&pid=ImgRaw&r=0",
        "autor": "J.R.R. Tolkien",
        "year_of_publication": "1954",
        "categorie": "Fantasia",
        "sinopsis": "El Señor de los Anillos es una trilogía de novelas de fantasía escrita por el filólogo y escritor británico J. R. R. Tolkien. La historia se desarrolla en la Tierra Media, un continente ficticio poblado por elfos, enanos, hobbits y hombres. La trilogía narra el viaje del hobbit Frodo Bolsón para destruir el Anillo Único, una poderosa arma forjada por el Señor Oscuro Sauron.",
        "editorial": "HarperCollins",
        "status": "New",
        "quantity": 10
    }
*/
export const postBookEmployee = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let tabla = await db.collection("book")

        if(Object.keys(req.body).length === 0) return res.status(200).send({status: 203, message: 'Enviar toda la data'})
        
        let newID = await autoIncrement("book")
        
        await tabla.insertOne(
            {
                id: newID,
                ...req.body
            }
        )

        res.status(200).send({status: 201, message: "Registro creado con exito"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de ingresar el registro"})
    }
}

export let putBookEmployee = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let id = req.params.id
        id = parseInt(id)

        let collection = db.collection("book")
        let respuesta = await collection.updateOne(
            { id: id },
            { $set: req.body }
        )

        res.status(200).send({status: 200, message: "Registro actualizado exitosamente"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de actualizar el registro"})
    }
}