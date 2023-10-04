import express from 'express'
import { my_config } from './helpers/config/variables.js'
import cors from 'cors'

import storageListar from './version/Optional/listar.js'
import storageInfoUser from './version/Optional/InfoUser.js'
import storagePostCustomer from './version/Optional/postCustomer.js'

import storageLogin from './routes/login.js'

import storageUser from './routes/user.js'
import storageLoan from './routes/loan.js'
import storageBook from './routes/book.js'
import storageReservation from './routes/reservation.js'
import storageListarInfoUser from './version/Optional/ListarInfoUser.js'

let appExpress = express()
appExpress.use(cors())
appExpress.use(express.json())

appExpress.use('/listar', storageListar)
appExpress.use("/infoUser", storageInfoUser)
appExpress.use("/obtenerDataUser", storageListarInfoUser)
appExpress.use('/postCustomer', storagePostCustomer)

appExpress.use('/login', storageLogin)

appExpress.use('/user', storageUser)
appExpress.use('/book', storageBook) 
appExpress.use('/loan', storageLoan)
appExpress.use('/reservation', storageReservation)


appExpress.listen(my_config, () => console.log(`http://${my_config.hostname}:${my_config.port}`))