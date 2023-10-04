import { autoIncrement } from "../../helpers/autoincrement/autoincrement.js";
import { con } from "../../helpers/config/connect.js";
import { validationResult } from "express-validator";

let db = await con()

export let getAllLoanEmployee = async(req, res) => {
    try {
        let tabla = db.collection("loan")
        let data = await tabla.aggregate(
            [
                {
                    $project: {
                        _id: 0
                    }
                },
                {
                    $sort: {
                        id: -1
                    }
                }
            ]
        ).toArray()

        res.send(data)

    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export let getIdLoanEmployee = async(req, res) => {
    try {
        let id = req.params.id
        id = parseInt(id)

        let tabla = db.collection("loan")
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

export let getNitLoanEmployee = async(req, res) => {
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

export let getLoanDateEmployee = async(req, res) => {
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

export let getLoanReturnDateEmployee = async(req, res) => {
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

export let getStateLoanEmployee = async(req, res) => {
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

/*
    {
        "nit_client": 1111111111,
        "count_book": [4],
        "date_return": "2024-05-19",
        "status": "Loan",
        "cost": 0
    }
*/
export let postLoanEmployee = async(req, res) => {
    try {

        let nitClient = req.body.nit_client
        nitClient = parseInt(nitClient)

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
        const countBookNotExistent = [];
        
        for (let i = 0; i < id_book.length; i++) {
            const bookId = parseInt(id_book[i]);
            const book = await tabla_book.findOne({ id: bookId });

            if (!book) nonExistentBooks.push(bookId);
            if(book.quantity === 0) countBookNotExistent.push(bookId);
        }

        if (nonExistentBooks.length > 0) return res.status(200).send({ status: 204, message: "Los libros con los siguientes ID " + nonExistentBooks + " No existen"});

        if (countBookNotExistent.length > 0) return res.status(200).send({ status: 204, message: "No hay la cantidad suficiente de existencia del libro " + countBookNotExistent });

        for (let i = 0; i < id_book.length; i++) {
            const bookId = parseInt(id_book[i]);
            const book = await tabla_book.findOne({ id: bookId });
            
            let quitarCantidad = Math.max(book.quantity - 1, 0);
             await tabla_book.updateOne(
                 { id: bookId },
                 { $set: { quantity: quitarCantidad } },
            );
        }

        let loan = new Date()
        let date = loan.toLocaleDateString('en-CA')
        
        let newID = await autoIncrement('loan')
        let nit = parseInt(req.body.nit_client)
        let count = req.body.count_book
        let date_Loan = date
        let date_Return = req.body.date_return
        let statu = req.body.status
        let cost = parseInt(req.body.cost)

        let tabla_load = db.collection('loan')
        await tabla_load.insertOne({
            id: newID,
            nit_client: nit,
            count_book: count,
            date_loan: date_Loan,
            date_return: date_Return,
            status: statu,
            cost: cost
        })

        res.status(200).send({status: 201, message: "Registro creado con exito"})

    } catch (error) {
        res.status(200).send({status: 203, message: error.message})
    }
}

export let putLoanEmployee = async(req, res) => {
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