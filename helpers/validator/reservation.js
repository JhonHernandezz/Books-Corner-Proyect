import { check } from "express-validator";

export const validateReservation = [
    check("nit_client")
    .isInt()
    .not()
    .withMessage("el campo 'nit_client' es obligatorio y tiene que ser un numero"),

    check("id_book")
    .isInt()
    .not()
    .withMessage("el campo 'id_book' es obligatorio y tiene que ser un numero"),

    check("date_end_reservation")
    .isString()
    .not()
    .withMessage("el campo 'date_end_reservation' es obligatorio y tiene que ser un string en formato de fecha 'AÑO-MES-DIA'"),

    check("status")
    .isString()
    .not()
    .withMessage("el campo 'status' es obligatorio y tiene que ser una de estas opciones 'Reserved, Cancelled reservation, Loan'"),
]