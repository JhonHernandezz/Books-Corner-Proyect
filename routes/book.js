import { Router } from "express";
import { versiones } from "../helpers/config/variables.js";
import { limitPeticiones } from "../helpers/limit/limit.js";
import passport from '../helpers/token/Passport.js'

import { deleteBook, getAllBook, getAuthorBook, getCategorieBook, getEditorialBook, getNameBook, postBook, putBook } from "../version/V3/book.js";
import { getAllBookEmployee, getCategorieBookEmployee, getNameBookEmployee, postBookEmployee, putBookEmployee } from "../version/V2/book.js";

import { validateBook } from "../helpers/validator/book.js";

let storageBook = Router()
storageBook.use(limitPeticiones(), passport.authenticate("bearer", {session: false}))

storageBook.get("/", versiones({
    "3.0.0": getAllBook,
    "2.0.0": getAllBookEmployee
}))

storageBook.get("/name/:name", versiones({
    "3.0.0": getNameBook,
    "2.0.0": getNameBookEmployee
}))

storageBook.get("/author/:author", versiones({
    "3.0.0": getAuthorBook
}))

storageBook.get("/categorie/:categorie", versiones({
    "3.0.0": getCategorieBook,
    "2.0.0": getCategorieBookEmployee
}))

storageBook.get("/editorial/:editorial", versiones({
    "3.0.0": getEditorialBook
}))

storageBook.post("/", validateBook, versiones({
    "3.0.0": postBook,
    "2.0.0": postBookEmployee
}))

storageBook.put("/update/:id", validateBook, versiones({
    "3.0.0": putBook,
    "2.0.0": putBookEmployee
}))

storageBook.delete("/delete/:id", versiones({
    "3.0.0": deleteBook
}))

export default storageBook