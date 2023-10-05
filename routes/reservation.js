import { Router } from "express";
import { versiones } from "../helpers/config/variables.js";
import { limitPeticiones } from "../helpers/limit/limit.js";
import passport from '../helpers/token/Passport.js';

import { deleteReservation, getAllReservation, getConsultarIdReservation, getDateReservation, getNITReservation, getStatusReservation, postReservation, putReservation } from "../version/V3/reservation.js";
import { getAllReservationEmployee, getConsultarIdReservationEmployee, getDateReservationEmployee, getNITReservationEmployee, getStatusReservationEmployee, postReservationEmployee, putReservationEmployee } from "../version/V2/reservation.js";

import { validateReservation } from "../helpers/validator/reservation.js";

let storageReservation = Router()
storageReservation.use(limitPeticiones(), passport.authenticate("bearer", {session: false}))

storageReservation.get("/", versiones({
    "3.0.0": getAllReservation,
    "2.0.0": getAllReservationEmployee
}))

storageReservation.get("/consultarId/:id", versiones({
    "3.0.0": getConsultarIdReservation,
    "2.0.0": getConsultarIdReservationEmployee
}))

storageReservation.get("/nit/:nit", versiones({
    "3.0.0": getNITReservation,
    "2.0.0": getNITReservationEmployee
}))

storageReservation.get("/date/:date", versiones({
    "3.0.0": getDateReservation,
    "2.0.0": getDateReservationEmployee
}))

storageReservation.get("/statu/:statu", versiones({
    "3.0.0": getStatusReservation,
    "2.0.0": getStatusReservationEmployee
}))

storageReservation.post("/", validateReservation, versiones({
    "3.0.0": postReservation,
    "2.0.0": postReservationEmployee
}))

storageReservation.put("/update/:id", validateReservation, versiones({
    "3.0.0": putReservation,
    "2.0.0": putReservationEmployee
}))

storageReservation.delete("/delete/:id", versiones({
    "3.0.0": deleteReservation
}))

export default storageReservation