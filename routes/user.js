import { Router } from 'express'
import { limitPeticiones } from '../helpers/limit/limit.js'
import { versiones } from '../helpers/config/variables.js'
import passport from '../helpers/token/Passport.js'

import { deleteUser, getANameUser, getAllUser, getIDUser, postUserCustomer, postUserEmployee, putUser } from '../version/V3/user.js'
import { getNameUserEmployee, getAllUserEmploye, getIDUserEmployee, postUserCustomerEmployee, putUserEmployee } from '../version/V2/user.js'

import { validateUser } from '../helpers/validator/user.js'

let storageUser = Router()
storageUser.use(limitPeticiones(), passport.authenticate("bearer", {session: false}))

storageUser.get("/", versiones({
    "3.0.0": getAllUser,
    "2.0.0": getAllUserEmploye
}))

storageUser.get("/id/:id", versiones({
    "3.0.0": getIDUser,
    "2.0.0": getIDUserEmployee
}))

storageUser.get("/name/:name", versiones({
    "3.0.0": getANameUser,
    "2.0.0": getNameUserEmployee
}))

storageUser.post("/postEmployee", validateUser, versiones({
    "3.0.0": postUserEmployee
}))

storageUser.post("/postCustomer", validateUser, versiones({
    "3.0.0": postUserCustomer,
    "2.0.0": postUserCustomerEmployee
}))

storageUser.put("/update/:dni", validateUser, versiones({
    "3.0.0": putUser,
    "2.0.0": putUserEmployee
}))

storageUser.delete("/delete/:dni", versiones({
    "3.0.0": deleteUser
}))

export default storageUser;