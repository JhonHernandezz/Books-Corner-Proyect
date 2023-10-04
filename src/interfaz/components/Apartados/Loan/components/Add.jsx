import React, { useState } from 'react'
import '../../Styles/StylesApartados.css'

export default function Add() {

    const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
    let token = localStorage.getItem('token')

    let [nit_client, setNit] = useState('')
    let [data_count_book, setDataCountBook] = useState('')
    let [count_book, setCountBook] = useState([])
    let [date_return, setDateReturn] = useState('')
    let [status, setStatus] = useState('')
    let [cost, setCost] = useState('0')

    let handleCountBook = (e) => {
        if (e.key !== 'Enter') {
            setCountBook([...count_book, parseInt(data_count_book)]);
            e.preventDefault();  
        }
    }

    const handleAgregar = async (e) => {
        e.preventDefault()

        try {
            let config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'Accept-Version': '3.0.0'
                },
                body: JSON.stringify({ nit_client, count_book, date_return, status, cost })
            };

            let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/loan`, config)).json()

            if (respuesta.status === 201) {
                alert('Registro agregado con éxito.')
                window.location.reload()
            } else {
                alert(respuesta.message)
                window.location.reload()
            } 

        } catch (error) {
            alert('Error al eliminar el registro');
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
                    <input className="input" name="nit_client" type="number" value={nit_client} onChange={(e) => setNit(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter Nit</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="count_book" type="text" value={data_count_book} onChange={(e) => setDataCountBook(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter ID Book</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                    <button onClick={handleCountBook}>Agregar</button>
                </div>

                <div className="input-container">
                    <label htmlFor="dateReturn" className="input-label">Date Return:</label>
                    <input id="dateReturn" className="input" type="date" name="date_return" value={date_return} onChange={(e) => setDateReturn(e.target.value)} required />
                </div>

                <div className="input-container">
                    <select className="input" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select a status</option>
                        <option value="Loan">Loan</option>
                    </select>
                    <label className="label" htmlFor="select">Select a status</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter Cost</label>
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
