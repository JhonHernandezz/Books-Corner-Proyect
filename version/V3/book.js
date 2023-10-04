import { con } from "../../helpers/config/connect.js";
import { autoIncrement } from "../../helpers/autoincrement/autoincrement.js";
import { validationResult } from "express-validator";

let db = await con()

export let getAllBook = async(req, res) => {
    try {
        let tabla = db.collection("book")
        let data = await tabla.aggregate(
            [
                {
                    $project: {
                        _id: 0
                    }
                },
                {
                    $sort: {
                        id: 1
                    }
                }
            ]
        ).toArray()

        res.send(data)

    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export let getIDBook = async(req, res) => {
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

export let getNameBook = async(req, res) => {
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

export let getAuthorBook = async(req, res) => {
    try {
        let author = req.params.author

        let tabla = db.collection("book")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        autor:  { $regex: `${author}`, $options: "i" }
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

export let getCategorieBook = async(req, res) => {
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

export let getEditorialBook = async(req, res) => {
    try {
        let editorial = req.params.editorial

        let tabla = db.collection("book")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        editorial:  { $regex: `${editorial}`, $options: "i" }
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
export const postBook = async(req, res) => {
    try {

        let name = req.body.name
        let photo = req.body.photo
        let autor = req.body.autor
        let yearOfPublication = req.body.yearOfPublication
        let categorie = req.body.categorie
        let sinopsis = req.body.sinopsis
        let editorial = req.body.editorial
        let status = req.body.status
        let quantity = req.body.quantity
        quantity = parseInt(quantity)

        let tabla = await db.collection("book")

        if(Object.keys(req.body).length === 0) return res.status(200).send({status: 203, message: 'Enviar toda la data'})
        
        let newID = await autoIncrement("book")
        
        await tabla.insertOne(
            {
                id: newID,
                name: name,
                photo: photo,
                autor: autor,
                year_of_publication: yearOfPublication,
                categorie: categorie,
                sinopsis: sinopsis,
                editorial: editorial,
                status: status,
                quantity: quantity
            }
        )

        res.status(200).send({status: 201, message: "Registro creado con exito"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de ingresar el registro"})
    }
}

export let putBook = async(req, res) => {
    try {
     
        let id = req.params.id
        id = parseInt(id)

        let quantity = req.body.quantity
        quantity = parseInt(quantity)

        let collection = db.collection("book")
        let respuesta = await collection.updateOne(
            { id: id },
            { $set: {...req.body, quantity: quantity} }
        )

        res.status(200).send({status: 200, message: "Registro actualizado exitosamente"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de actualizar el registro"})
    }
}

export let deleteBook = async(req, res) => {
    try {

        let id = req.params.id
        id = parseInt(id)

        let collection = db.collection("book")
        let respuesta = await collection.deleteOne({ id: id })

        res.status(200).send({status: 200, message: "Registro actualizado exitosamente"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error al eliminar el registro registro"})
    }
}