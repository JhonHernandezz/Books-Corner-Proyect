import React, { useState } from 'react'
import '../../Styles/StylesApartados.css'

export default function Add() {

    const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
    let token = localStorage.getItem('token')

    let [name, setName] = useState('')
    let [photo, setPhoto] = useState('')
    let [autor, setAutor] = useState('')
    let [yearOfPublication, setYearOfPublication] = useState('')
    let [categorie, setCategorie] = useState('')
    let [sinopsis, setSinopsis] = useState('')
    let [editorial, setEditorial] = useState('')
    let [status, setStatus] = useState('')
    let [quantity, setQuantity] = useState('')

    const handleAgregar = async (e) => {
        e.preventDefault()
        try {
            let config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                    "Accept-Version": "3.0.0",
                },
                body: JSON.stringify({ name, photo, autor, yearOfPublication, categorie, sinopsis, editorial, status, quantity })
            }

            let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/book`, config)).json()

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

    const handleSalir = () => {
        let salir = confirm("¿Estás seguro de que quiere salir?");
        if (salir) {
            window.location.reload();
        }
    }

    return (
        <div className='contentUpdate'>

            <form onSubmit={handleAgregar} className='formAddAndPut'>
                <div className="input-container">
                    <input className="input" name="name" type="text" onChange={(e) => setName(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter Name</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="photo" type="text" onChange={(e) => setPhoto(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter Photo</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="autor" type="text" onChange={(e) => setAutor(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter Author</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="year_of_publication" type="number" onChange={(e) => setYearOfPublication(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter year of publication</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <select className="input" name="categorie" onChange={(e) => setCategorie(e.target.value)}>
                        <option value="">Search a Category</option>
                        <option value="Accion">Accion</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Clasicos">Clasicos</option>
                        <option value="Misterio">Misterio</option>
                        <option value="Fantasia">Fantasia</option>
                        <option value="Horror">Horror</option>
                        <option value="Suspenso y Thriller">Suspenso y Thriller</option>
                        <option value="Historia">Historia</option>
                        <option value="Poesia">Poesia</option>
                    </select>
                    <label className="label" htmlFor="select">Select a category</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="sinopsis" type="text" onChange={(e) => setSinopsis(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter Sinopsis</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="editorial" type="text" onChange={(e) => setEditorial(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter Editorial</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <select className="input" name="status" onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select a status</option>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                    </select>
                    <label className="label" htmlFor="select">Select a status</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="quantity" type="number" onChange={(e) => setQuantity(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter Quantity</label>
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
