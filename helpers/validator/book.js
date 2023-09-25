import { check } from "express-validator";

export const validateBook = [
    check("name")
    .isString()
    .not()
    .withMessage("el campo 'name' es obligatorio y tiene que ser un string"),

    check("photo")
    .isString()
    .not()
    .withMessage("el campo 'photo' es obligatorio, ingresar el link de la foto sacada desde alguna nube de google"),

    check("autor")
    .isString()
    .not()
    .withMessage("el campo 'autor' es obligatorio y tiene que ser un string"),

    check("year_of_publication")
    .isString()
    .not()
    .withMessage("el campo 'year_of_publication' es obligatorio y tiene que ser un string"),

    check("categorie")
    .isString()
    .not()
    .withMessage("el campo 'categorie' es obligatorio y tiene que ser una de estas opciones 'Accion, Aventura, Clasicos, Misterio, Fantasia, Horror, Romance, Suspenso y Thriller, Historia, Poesia'"),

    check("sinopsis")
    .isString()
    .not()
    .withMessage("el campo 'sinopsis' es obligatorio, debe de ser una descripción sobre el libro"),

    check("editorial")
    .isString()
    .not()
    .withMessage("el campo 'editorial' es obligatorio y tiene que ser un string"),

    check("categorie")
    .isString()
    .not()
    .withMessage("el campo 'categorie' es obligatorio y tiene que ser una de estas opciones 'New, Used'"),

    check("quantity")
    .isInt()
    .not()
    .withMessage("el campo 'quantity' es obligatorio y tiene que ser un numero")
]