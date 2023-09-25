import { check } from "express-validator";

export const validateLoan = [
    check("nit_client")
    .isInt()
    .not()
    .withMessage("el campo 'nit_client' es obligatorio y tiene que ser un numero"),

    check("count_book")
    .isInt()
    .not()
    .withMessage("el campo 'count_book' es obligatorio y tiene que ser un numero"),

    check("date_return")
    .isString()
    .not()
    .withMessage("el campo 'date_return' es obligatorio y tiene que ser un string en formato de fecha 'AÑO-MES-DIA'"),

    check("status")
    .isString()
    .not()
    .withMessage("el campo 'status' es obligatorio y tiene que ser una de estas opciones 'Loan, Return, Overdue'"),

    check("cost")
    .isInt()
    .not()
    .withMessage("el campo 'cost' es obligatorio y tiene que ser un numero")
]