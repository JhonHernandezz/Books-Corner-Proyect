import { Router } from 'express'
import { limitPeticiones } from '../helpers/limit/limit.js'
import { versiones } from '../helpers/config/variables.js'
import passport from '../helpers/token/Passport.js'

import { getAllCustomer } from '../version/V1/customer.js'
import { deleteLoan, getAllLoan, getIdLoan, getLoanDate, getLoanReturnDate, getNitLoan, getStateLoan, postLoan, putLoan } from '../version/V3/loan.js'
import { getAllLoanEmployee, getIdLoanEmployee, getLoanDateEmployee, getLoanReturnDateEmployee, getNitLoanEmployee, getStateLoanEmployee, postLoanEmployee, putLoanEmployee } from '../version/V2/loan.js'

import { validateLoan } from '../helpers/validator/loan.js'

let storageLoan = Router()
storageLoan.use(limitPeticiones(), passport.authenticate("bearer", {session: false}))

storageLoan.get("/bookCustomer/", versiones({
    "1.0.0": getAllCustomer
}))

storageLoan.get("/getAllLoan", versiones({
    "3.0.0": getAllLoan,
    "2.0.0": getAllLoanEmployee
}))

storageLoan.get("/getIdLoan/:id", versiones({
    "3.0.0": getIdLoan,
    "2.0.0": getIdLoanEmployee
}))

storageLoan.get("/getNitLoan/:nit", versiones({
    "3.0.0": getNitLoan,
    "2.0.0": getNitLoanEmployee
}))

storageLoan.get("/getLoanDate/:date", versiones({
    "3.0.0": getLoanDate,
    "2.0.0": getLoanDateEmployee
}))

storageLoan.get("/getLoanReturnDate/:returnDate", versiones({
    "3.0.0": getLoanReturnDate,
    "2.0.0": getLoanReturnDateEmployee
}))

storageLoan.get("/getStateLoan/:state", versiones({
    "3.0.0": getStateLoan,
    "2.0.0": getStateLoanEmployee
}))

storageLoan.post("/", validateLoan, versiones({
    "3.0.0": postLoan,
    "2.0.0": postLoanEmployee
}))

storageLoan.put("/update/:id", validateLoan, versiones({
    "3.0.0": putLoan,
    "2.0.0": putLoanEmployee
}))

storageLoan.delete("/delete/:id", versiones({
    "3.0.0": deleteLoan
}))


export default storageLoan;