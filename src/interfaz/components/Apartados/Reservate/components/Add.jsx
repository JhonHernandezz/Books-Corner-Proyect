import React, { useState } from 'react'
import '../../Styles/StylesApartados.css'

export default function Add() {

    const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
    let token = localStorage.getItem('token')

    let [nit_client, setNit] = useState('')
    let [id_book, setIdBook] = useState('')
    let [date_reservation, setDateReservation] = useState('')
    let [date_end_reservation, setDateEndReservation] = useState('')
    let [status, setStatus] = useState('')

    const handleAgregar = async(e) => {
        e.preventDefault()
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'Accept-Version': '3.0.0'
                },
                body: JSON.stringify({ nit_client, id_book, date_reservation, date_end_reservation, status })
            };

            let respuesta = await(await fetch(`http://${url.hostname}:${url.port}/reservation`, config)).json()

            if (respuesta.status === 201) {
                alert('Registro agregado con éxito.')
                window.location.reload()
            } else {
                alert(respuesta.message)
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
                    <input className="input" name="nit" type="number" value={nit_client} onChange={(e) => setNit(e.target.value)} required/>
                    <label className="label" htmlFor="input">Enter Nit</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <input className="input" name="id_book" type="number" value={id_book} onChange={(e) => setIdBook(e.target.value)} required />
                    <label className="label" htmlFor="input">Enter Book</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>

                <div className="input-container">
                    <label htmlFor="dateReturn" className="input-label">Date Reservation</label>
                    <input id="dateReturn" className="input" type="date" name="date_reservation" value={date_reservation} onChange={(e) => setDateReservation(e.target.value)} required/>
                </div>

                <div className="input-container">
                    <label htmlFor="dateReturn" className="input-label">Date End Reservation</label>
                    <input id="dateReturn" className="input" type="date" name="date_end_reservation" value={date_end_reservation} onChange={(e) => setDateEndReservation(e.target.value)} required />
                </div>

                <div className="input-container">
                    <select className="input" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select a status</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Cancelled reservation">Cancelled reservation</option>
                        <option value="Loan">Loan</option>
                    </select>
                    <label className="label" htmlFor="select">Select a status</label>
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
