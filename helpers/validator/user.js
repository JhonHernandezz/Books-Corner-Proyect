import { check } from "express-validator";

export const validateUser = [
    check("nit")
    .isInt()
    .not()
    .withMessage("el campo 'nit' es obligatorio y tiene que ser un numero"),

    check("password")
    .isString()
    .not()
    .withMessage("el campo 'password' es obligatorio y tiene que ser un string"),

    check("name")
    .isString()
    .not()
    .withMessage("el campo 'name' es obligatorio y tiene que ser un string"),

    check("phone")
    .isString()
    .not()
    .matches(/\+\d\s\d$/)
    .withMessage("el campo 'phone' es obligatorio y tiene que ser un string con solo numeros"),

    check("address")
    .isString()
    .not()
    .withMessage("el campo 'address' es obligatorio y tiene que ser un string"),

    check("email")
    .isString()
    .not()
    .withMessage("el campo 'email' es obligatorio y tiene que ser un string"),
]