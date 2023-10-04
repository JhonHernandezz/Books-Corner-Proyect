import { con } from "../../helpers/config/connect.js";

let db = await con()

export let getAllCustomer = async (req, res) => {
    try {
        let { NIT } = req.data.payload

        let tabla = db.collection("loan")
        let data = await tabla.aggregate([
            {
                $match: {
                    nit_client: NIT,
                },
            },
            {
                $unwind: "$count_book",
            },
            {
                $lookup: {
                    from: "book",
                    localField: "count_book",
                    foreignField: "id",
                    as: "fk_loan_book",
                },
            },
            {
                $group: {
                    _id: "$id",
                    nit_client: { $first: "$nit_client" },
                    date_loan: { $first: "$date_loan" },
                    date_return: { $first: "$date_return" },
                    status: { $first: "$status" },
                    cost: { $first: "$cost" },
                    count_book: { $push: "$count_book" },
                    fk_loan_book: { $push: "$fk_loan_book" }
                }
            },
            {
                $sort:{
                    id: 1
                }
            }
        ]).toArray();
        


        res.send(data)

    } catch (error) {
        res.send("No se pudo obtener los datos")
    }
}