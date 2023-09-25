import { autoIncrement } from "../../helpers/autoincrement/autoincrement.js";
import { con } from "../../helpers/config/connect.js";
import { validationResult } from "express-validator";

let db = await con()

export let getAllLoan = async(req, res) => {
    try {
        let tabla = db.collection("loan")
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

export let getNitLoan = async(req, res) => {
    try {
        let nit = req.params.nit
        nit = parseInt(nit)

        let tabla = db.collection("loan")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        nit_client: nit
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

export let getLoanDate = async(req, res) => {
    try {
        let date = req.params.date

        let tabla = db.collection("loan")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        date_loan: { $regex: `${date}`, $options: "i" }
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

export let getLoanReturnDate = async(req, res) => {
    try {
        let returnDate = req.params.returnDate

        let tabla = db.collection("loan")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        date_return: { $regex: `${returnDate}`, $options: "i" }
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

export let getStateLoan = async(req, res) => {
    try {
        let state = req.params.state

        let tabla = db.collection("loan")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        status: { $regex: `${state}`, $options: "i" }
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

export let postLoan = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        if(Object.keys(req.body).length === 0) return res.status(200).send({status: 203, message: 'Enviar toda la data'})

        let nitClient = req.body.nit_client
        let tabla_user = db.collection("user")

        let compararNit = await tabla_user.findOne(
            {
                nit: nitClient  
            }
        )

        if (!compararNit) return res.send({status:204, message: "Este usuario no existe"}) 

        let tabla_book = db.collection('book')

        let id_book = req.body.count_book
        const nonExistentBooks = [];
        const countBookNotExistent = []
        
        for (let i = 0; i < id_book.length; i++) {
            const bookId = id_book[i];
            const book = await tabla_book.findOne({ id: bookId });

            if (!book) nonExistentBooks.push(bookId);
            else if (book.quantity > 0) {
                let quitarCantidad = Math.max(book.quantity - 1, 0);
        
                await tabla_book.updateOne(
                    { id: bookId },
                    { $set: { quantity: quitarCantidad } },
                );
            }
            else countBookNotExistent.push(bookId);
        }

        if (nonExistentBooks.length > 0) return res.status(200).send({ status: 204, message: "Los libros con los siguientes ID " + nonExistentBooks + " No existen"});

        if (countBookNotExistent.length > 0) return res.status(200).send({ status: 204, message: "No hay la cantidad suficiente de existencia del libro " + countBookNotExistent });

        let loan = new Date()
        let date = String(`${loan.getFullYear()}-0${loan.getMonth() + 1}-${loan.getDate()}`)
        
        let newID = await autoIncrement('loan')

        let tabla_load = db.collection('loan')
        await tabla_load.insertOne({
            id: newID,
            date_loan: date,
            ...req.body
        })

        res.status(200).send({status: 201, message: "Registro creado con exito"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de ingresar el registro"})
    }
}

export let putLoan = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let id = req.params.id
        id = parseInt(id)

        let retorno = req.body.status
        
        if (retorno === 'Return') {
            
            let tabla_book = db.collection('book')

            let id_book = req.body.count_book
            
            for (let i = 0; i < id_book.length; i++) {
                const bookId = id_book[i];
                const book = await tabla_book.findOne({ id: bookId });

                let sumarCantidad = book.quantity + 1
            
                await tabla_book.updateOne(
                    { id: bookId },
                    { $set: { quantity: sumarCantidad } },
                );
            }

        }

        let loan = new Date()
        let date = String(`${loan.getFullYear()}-0${loan.getMonth() + 1}-${loan.getDate()}`)

        let collection = db.collection("loan")
        await collection.updateOne(
            { id: id },
            { $set: {id: id, date_loan: date, ...req.body } }
        )

        res.status(200).send({status: 200, message: "Registro actualizado exitosamente"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de actualizar el registro"})
    }
}

export let deleteLoan = async(req, res) => {
    try {

        let id = req.params.id
        id = parseInt(id)

        let collection = db.collection("loan")
        await collection.deleteOne({ id: id })

        res.status(200).send({status: 200, message: "Registro eliminado exitosamente"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error al eliminar el registro registro"})
    }
}