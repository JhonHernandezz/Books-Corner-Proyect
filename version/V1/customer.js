import { con } from "../../helpers/config/connect.js";

let db = await con()

export let getAllCustomer = async(req, res) => {
    try {
        let nit = req.params.nit
        nit = parseInt(nit)

        let tabla = db.collection("user")
        let data = await tabla.aggregate(
            [
                {
                    $match: {
                        nit: nit
                    }
                },
                {
                    $lookup: {
                    from: "loan",
                    localField: "nit",
                    foreignField: "nit_client",
                    as: "fk_user_loan"
                    }
                },
                {
                    $lookup: {
                    from: "book",
                    localField: "fk_user_loan.count_book",
                    foreignField: "id",
                    as: "fk_loan_book"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        nit: 1,
                        name: 1,
                        "fk_user_loan.count_book": 1,
                        "fk_loan_book.name": 1,
                        "fk_loan_book.photo": 1,
                        "fk_loan_book.autor": 1,
                        "fk_loan_book.year_of_publication": 1,
                        "fk_loan_book.categorie": 1,
                        "fk_loan_book.sinopsis": 1,
                        "fk_loan_book.editorial": 1,
                    }
                }
            ]
        ).toArray()

        res.send(data)

    } catch (error) {
        res.send("No se pudo obtener los datos")
    }
}