import React, { useState } from 'react'

export default function AddEmployee() {
    let url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
    let token = localStorage.getItem('token')

    let [role, setRole] = useState("")
    let [nit, setNit] = useState("")
    let [password, setPassword] = useState("")
    let [name, setName] = useState("")
    let [phone, setPhone] = useState("")
    let [address, setAddress] = useState("")
    let [email, setEmail] = useState("")

    let handleAgregar = async (e) => {
        e.preventDefault();
        try {
            let config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                    "Accept-Version": "2.0.0",
                },
                body: JSON.stringify({ role, nit, password, name, phone, address, email })
            }

            let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/user/postCustomer`, config)).json()

            if (respuesta.status === 201) {
                alert('Registro agregado con éxito.')
                window.location.reload()
            } else {
                alert(respuesta.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleNameChange = (e) => {
        const newName = e.target.value;
        const containsNumber = /\d/.test(newName);
        if (containsNumber) {
            alert('El nombre no puede contener números.');
        }
        setName(newName);
    };

    const handleSalir = () => {
        let salir = confirm("¿Estás seguro de que quiere salir?");
        if (salir) {
            window.location.reload()
        }
    }

    return (
        <div className='contentUpdate'>

            <form onSubmit={handleAgregar} className='formAddAndPut'>
                <div className="input-container">
                    <select className="input" onChange={(e) => setRole(e.target.value)} name="role" required>
                        <option value="">Select a role</option>
                        <option value="Customer">Customer</option>
                    </select>
                    <label className="label" htmlFor="select">Select a role</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="nit" onChange={(e) => setNit(e.target.value)} type="number" required />
                    <label className="label" htmlFor="input">Enter Your Nit</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="password" onChange={(e) => setPassword(e.target.value)} type="text" required />
                    <label className="label" htmlFor="input">Enter Your Password</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="name" onChange={handleNameChange} type="text" required />
                    <label className="label" htmlFor="input">Enter Your Name</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="phone" onChange={(e) => setPhone(e.target.value)} type="text" required />
                    <label className="label" htmlFor="input">Enter Your Phone</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="address" onChange={(e) => setAddress(e.target.value)} type="text" required />
                    <label className="label" htmlFor="input">Enter Your Address</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="email" onChange={(e) => setEmail(e.target.value)} type="email" required />
                    <label className="label" htmlFor="input">Enter Your Email</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className='contenedorBoton'>
                    <button className='optionSend'>SEND</button>
                </div>

            </form>

            <div className='contenedorBotonSalirUser'>
                <button className='optionExit' onClick={handleSalir}>EXIT</button>
            </div>

        </div>
    )
}
