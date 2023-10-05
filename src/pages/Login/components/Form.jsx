import React, { useState } from 'react'
import './Form.css'
import { redirect, useNavigate } from 'react-router-dom'

export default function Form() {

    const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);

    const [user, setUser] = useState("")
    const [pass, setPassword] = useState("")

    // Aca se guarda la informacion de cada input 
    const [nit, setNit] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [password, setContra] = useState("")
    // ------------------------------------------
    const redirect = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {

            let config = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user, pass })
            }

            let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/login`, config)).json()

            if (respuesta.status === 400) {
                alert(respuesta.message)
            } else {
                localStorage.setItem("rol", respuesta.ROL);
                localStorage.setItem("token", respuesta.message);

                let config = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user })
                }

                let respuestaInfo = await (await fetch(`http://${url.hostname}:${url.port}/infoUser`, config)).json()

                if (respuestaInfo[0].role === "Admin") {
                    redirect("/Admin")
                } else if (respuestaInfo[0].role === "Employee") {
                    redirect("/Employee")
                } else {
                    redirect("/Customer")
                }

            }

        } catch (error) {
            alert(error);
        }

    }

    const hanbleSignUp = async (e) => {
        e.preventDefault()

        try {

            let config = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nit, name, phone, address, email, password })
            }

            let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/postCustomer`, config)).json()
            alert(respuesta.message)
            window.location.reload()
        } catch (error) {
            alert(error)
        }
    }

    let handleVolver = () => {
        redirect("/")
    }

    return (
        <div>
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3 tituloLogin"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">

                                        <div className="card-front">
                                            <button className='botonVolver' onClick={handleVolver}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                                </svg>
                                            </button>
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>

                                                    <form onSubmit={handleLogin}>
                                                        <div className="form-group">
                                                            <input type="number" name="user" className="form-style" onChange={(e) => setUser(e.target.value)} placeholder="Your Document" id="user" required />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="password" name="pass" className="form-style" onChange={(e) => setPassword(e.target.value)} placeholder="Your Password" id="pass" required />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button type='submit' className="btn mt-4">enter</button>
                                                    </form>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Sign Up</h4>

                                                    <form onSubmit={hanbleSignUp}>
                                                        <div className="form-group">
                                                            <input type="number" name="nit" className="form-style" onChange={(e) => setNit(e.target.value)} placeholder="Your Document" id="lognit" required />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="text" name="name" className="form-style" onChange={(e) => setName(e.target.value)} placeholder="Your Full Name" id="logname" required />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="text" name="phone" className="form-style" onChange={(e) => setPhone(e.target.value)} placeholder="Your Phone" id="logphone" required />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="text" name="address" className="form-style" onChange={(e) => setAddress(e.target.value)} placeholder="Your Address" id="logaddress" required />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="email" name="email" className="form-style" onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" id="logemail" required />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="password" name="password" className="form-style" onChange={(e) => setContra(e.target.value)} placeholder="Your Password" id="logpass" required />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button type='submit' className="btn mt-4">enter</button>
                                                    </form>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
