import { check } from "express-validator";

export const validateLogin = [
    check("user")
    .isInt()
    .not()
    .withMessage("el campo 'name' es obligatorio y tiene que ser un numero"),

    check("pass")
    .isString()
    .not()
    .withMessage("el campo 'photo' es obligatorio y tiene que ser un string")
]