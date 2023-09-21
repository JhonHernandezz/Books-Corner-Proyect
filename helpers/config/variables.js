import routesVersioning from "express-routes-versioning"
import { loadEnv } from "vite"

let env = loadEnv("development", process.cwd(), 'VITE')

export const my_config = JSON.parse(env.VITE_MY_CONFIG)
export const my_connect = JSON.parse(env.VITE_MY_CONNECT)
export const my_jwt = env.VITE_MY_JWT

export const versiones = routesVersioning()