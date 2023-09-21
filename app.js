import express from 'express'
import { my_config } from './helpers/config/variables.js'
import cors from 'cors'

let appExpress = express()
appExpress.use(cors())
appExpress.use(express.json())

appExpress.listen(my_config, () => console.log(`http://${my_config.hostname}:${my_config.port}`))