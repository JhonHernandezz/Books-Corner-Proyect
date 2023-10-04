import { ObjectId } from "mongodb";
import { autoIncrement } from "../../helpers/autoincrement/autoincrement.js";
import { con } from "../../helpers/config/connect.js";
import { validationResult } from "express-validator";

let db = await con()

export const getAllReservation = async(req, res) => {
    try {
        let tabla = db.collection("reservation")
        let data = await tabla.aggregate(
            [
                {
                    $sort:{
                        id: -1
                    }
                }
            ]
        ).toArray();

        res.send(data)
        
    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export const getConsultarIdReservation = async(req, res) => {
    try {

        let id = parseInt(req.params.id)

        let tabla = db.collection("reservation")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        id: id
                    }
                }
            ]
        ).toArray();

        res.send(data)
        
    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export const getNITReservation = async(req, res) => {
    try {
        let nit = req.params.nit
        nit = parseInt(nit)

        let tabla = db.collection("reservation")
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
        ).toArray();

        res.send(data)
        
    } catch (error) {
        res.status(200).send({status: 204, message: "Error al traer los datos"})
    }
}

export const getDateReservation = async(req, res) => {
    try {
        let date = req.params.date

        let tabla = db.collection("reservation")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        date_reservation: { $regex: `${date}`, $options: "i" }
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

export const getStatusReservation = async(req, res) => {
    try {
        let statu = req.params.statu

        let tabla = db.collection("reservation")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        status:  { $regex: `${statu}`, $options: "i" }
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
        "nit_client": 1234567890,
        "id_book": 19,
        "date_end_reservation": "2024-06-26",
        "status": "Reserved"
    }
*/
export let postReservation = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        if(Object.keys(req.body).length === 0) return res.status(200).send({status: 203, message: 'Enviar toda la data'})

        let nitClient = parseInt(req.body.nit_client)
        let tabla_user = db.collection("user")

        let compararNit = await tabla_user.findOne(
            {
                nit: nitClient  
            }
        )

        if (!compararNit) return res.send({status:204, message: "Este usuario no existe"}) 

        let tabla_book = db.collection('book')

        let id_book = parseInt(req.body.id_book)

        let dataExistBook = await tabla_book.findOne(
            {
                id: id_book
            }
        )

        if (!dataExistBook) return res.status(200).send({ status: 204, message: "Este libro no existe en la coleccion"});
        
        let newID = await autoIncrement('reservation')
        let nit = parseInt(req.body.nit_client)
        let book = parseInt(req.body.id_book)
        let reservation = req.body.date_reservation
        let end_reservation = req.body.date_end_reservation
        let status = req.body.status

        let tabla_load = db.collection('reservation')
        await tabla_load.insertOne({
            id: newID,
            nit_client: nit,
            id_book: book,
            date_reservation: reservation,
            date_end_reservation: end_reservation,
            status: status
        })

        res.status(200).send({status: 201, message: "Registro creado con exito"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de ingresar el registro"})
    }
}

export let putReservation = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(200).json({ status: 400, message: error.errors[0].msg });

        let id = req.params.id
        id = parseInt(id)

        let estado = req.body.status
        let id_book_tabla = req.body.id_book

        let buscarLibro = db.collection("book")
        let dataLibro = await buscarLibro.findOne(
            {id: id_book_tabla}
        )

        if (!dataLibro) return res.status(200).send({status: 206, message: "Este libro no existe"}) 

        if (estado === "Loan") {

            let tabla_book = db.collection('book')

            let book = await tabla_book.findOne(
                {
                    id: id_book_tabla
                }
            )

            if (book.quantity === 0) return res.status(200).send({status: 206, meesage: 'No hay existencias de este libro disponible'})

            let quitarLibro = book.quantity - 1

            await tabla_book.updateOne(
                {id: id_book_tabla},
                {$set: { quantity: quitarLibro } }
            )

            let newID = await autoIncrement("loan")

            let nit_client = req.body.nit_client
            let bookBody = req.body.id_book
            let date_start = req.body.date_end_reservation

            const hoy = new Date(); 
            const dosSemanasDespues = new Date(hoy);
            dosSemanasDespues.setDate(hoy.getDate() + 14); 

            const año = dosSemanasDespues.getFullYear();
            const mes = String(dosSemanasDespues.getMonth() + 1).padStart(2, '0');
            const dia = String(dosSemanasDespues.getDate()).padStart(2, '0');

            const fechaFormateada = `${año}-${mes}-${dia}`;

            let date_return = fechaFormateada

            let status = req.body.status
            let cost = 0

            let tabla_loan = db.collection('loan')
            await tabla_loan.insertOne(
                {
                    _id: new ObjectId(),
                    id: newID,
                    nit_client: nit_client,
                    count_book: [bookBody],
                    date_loan: date_start,
                    date_return: date_return,
                    status: status,
                    cost: cost
                }
            )
        }

        let tabla_reservacion = db.collection("reservation")

        let loan = new Date()
        let date = String(`${loan.getFullYear()}-0${loan.getMonth() + 1}-${loan.getDate()}`)

        await tabla_reservacion.updateOne(
            {id: id},
            {$set: {id: id, date_reservation: date, ...req.body}}
        )

        return res.status(200).send({status: 201, message: "Registro actualizado con exito"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error en los datos al momento de actualizar el registro"})
    }
}

export let deleteReservation = async(req, res) => {
    try {

        let id = req.params.id
        id = parseInt(id)

        let collection = db.collection("reservation")
        let respuesta = await collection.deleteOne({ id: id })

        res.status(200).send({status: 200, message: "Registro eliminado exitosamente"})

    } catch (error) {
        res.status(200).send({status: 203, message: "Error al eliminar el registro registro"})
    }
}