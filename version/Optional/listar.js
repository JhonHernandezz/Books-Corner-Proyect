import { con } from "../../helpers/config/connect.js";
import { Router } from "express";

let db = await con();
let storageListar = Router()

storageListar.get("/", async(req, res) => {
    try {
        
        let tabla = db.collection("book")
        let data = await tabla.aggregate(
            [
                {
                    $project: {
                        _id: 0,
                        id: 0,
                        status: 0,
                        quantity: 0
                    }
                }
            ]
        ).toArray()

        res.send(data)

    } catch (error) {
        res.send("No se pudieron listar los libros")
    }
})

export default storageListar