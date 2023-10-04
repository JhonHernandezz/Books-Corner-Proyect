import { con } from "../../helpers/config/connect.js";
import { Router } from "express";
import passport from '../../helpers/token/PassportUser.js'


let db = await con();
let storageListarInfoUser = Router()

storageListarInfoUser.use(passport.authenticate("bearer", {session: false}))

storageListarInfoUser.get("/", async(req, res) => {
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
                        name: 1,
                        role: 1
                    }
                }
            ]
        ).toArray()

        res.status(200).send({status: 202, message: data})

    } catch (error) {
        res.send("No se pudieron listar los usuarios")
    }
})

export default storageListarInfoUser