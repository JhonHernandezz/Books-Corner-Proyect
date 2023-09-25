import { Router } from "express";
import { crearToken } from "../helpers/token/token.js";
import { limitSesion } from "../helpers/limit/limit.js";

import { validateLogin } from "../helpers/validator/login.js";

let storageLogin = Router()

storageLogin.post("/", limitSesion(), validateLogin, crearToken)

export default storageLogin