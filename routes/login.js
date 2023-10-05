import { Router } from "express";
import { crearToken } from "../helpers/token/token.js";
import { limitSesion } from "../helpers/limit/limit.js";

import { validateLogin } from "../helpers/validator/login.js";

let storageLogin = Router()

/* 
    {
        "user": 1234567890,
        "pass": "password123" 
    }
*/
storageLogin.post("/", limitSesion(), validateLogin, crearToken)

export default storageLogin