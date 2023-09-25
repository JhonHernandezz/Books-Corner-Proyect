import { con } from "../config/connect.js";

export const autoIncrement = async (colleccionName) =>{

    const db = await con();
    const coleccion = db.collection("autoincrement");

    const resultado = await coleccion.findOneAndUpdate(

        { ID: `${colleccionName}id` },
        { $inc: { sequenceValue: 1 } },
        { returnDocument: "after" }
    );

    return resultado.sequenceValue;

}