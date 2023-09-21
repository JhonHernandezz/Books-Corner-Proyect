import { my_jwt } from "../config/variables.js";
import { SignJWT, jwtVerify } from "jose";
import { con } from "../config/connect.js";
import { ObjectId } from "mongodb";

let db = await con()

export const crearToken = async(req, res, next) => {

    let {user, pass } = req.body;

    if (Object.keys(req.body).length === 0) {
        res.send("falta data")
    } else { 
        
        let tabla = db.collection('user')

        let usuario = await tabla.findOne({nit: user})
        if (!usuario) return res.send("Este usuario no existe, por favor registrese")
        
        let data = await tabla.findOne({nit: user, password: pass})

        if (!data) return res.send("Usuario o contraseña incorrecto")
        
        let encoder = new TextEncoder()
        let dataGuardarToken = {
            ID: data._id.toString(),
            NIT: data.nit,
            ROL: data.role,
            PERMISOS: data.permisos
        }

        let jwtConstruct = await new SignJWT(dataGuardarToken)
        .setIssuedAt()
        .setProtectedHeader({alg: "HS256", typ: "JWT"})
        .setExpirationTime("30h")
        .sign(encoder.encode(my_jwt))

        const llave = "Bearer " + jwtConstruct

        res.send({status: 200, message: llave})

    }
}

export let validarToken = async(req, token) => {
    try {
        const encoder = new TextEncoder()
        const jwtData = await jwtVerify(token, encoder.encode(my_jwt))

        let busqueda = await db.collection("user").findOne(
            {
                _id: new ObjectId(jwtData.payload.ID),
                [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`
            }
        )

        let {_id, permisos, ...Usuario} = busqueda

        return Usuario;
        
    } catch (error) {
        return false;
    }
}