import { con } from "../../helpers/config/connect.js";
import { Router } from "express";

let db = await con();
let storageInfoUser = Router()

storageInfoUser.post("/", async(req, res) => {
    try {

        let {user} = req.body
        user = parseInt(user)
        
        let tabla = db.collection("user")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        nit: user
                    }
                },
                {
                    $project: {
                        _id: 0,
                        address: 0,
                        email: 0,
                        password: 0,
                        permisos: 0
                    }
                }
            ]
        ).toArray()

        res.send(data)

    } catch (error) {
        res.send("No se pudieron listar los usuarios")
    }
})

export default storageInfoUser