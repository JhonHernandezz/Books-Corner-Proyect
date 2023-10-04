import React, { useEffect, useState } from 'react'
import '../../Styles/StylesApartados.css'

export default function Update({ id }) {

  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
  let token = localStorage.getItem('token')

  let [nit_client, setNit] = useState('')
  let [id_book, setIdBook] = useState('')
  let [date_reservation, setDateReservation] = useState('')
  let [date_end_reservation, setDateEndReservation] = useState('')
  let [status, setStatusReservation] = useState('')

  const handleActualizar = async(e) => {
    e.preventDefault()

    try {
      let config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          "Accept-Version": "3.0.0",
        },
        body: JSON.stringify({ nit_client, id_book, date_reservation, date_end_reservation, status })
      }
  
      let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/reservation/update/${id}`, config)).json()

      if (respuesta.status === 201) {
        alert('Registro actualizado con éxito.')
        window.location.reload()
      } else {
        alert(respuesta.message)
      }
    } catch (error) {
      console.log();(error)
    }
  }

  const handleSalir = () => {
    let salir = confirm("¿Estás seguro de que quiere salir?");
    if (salir) {
      window.location.reload();
    }
  }

  let pintarDataReservate = async () => {
    try {
      let config = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          "Accept-Version": "3.0.0"
        }
      }

      let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/reservation/consultarId/${id}`, config)).json()

      if (respuesta.length > 0) {
        const userData = respuesta[0];

        setNit(userData.nit_client);
        setIdBook(userData.id_book);
        setDateReservation(userData.date_reservation);
        setDateEndReservation(userData.date_end_reservation);
        setStatusReservation(userData.status);
      }

    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => { pintarDataReservate() }, [])

  return (
    <div className='contentUpdate'>

      <form onSubmit={handleActualizar} className='formAddAndPut'>
        <div className="input-container">
          <input className="input" name="nit_client" type="text" value={nit_client} onChange={(e) => setNit(e.target.value)} disabled/>
          <label className="label" htmlFor="input">Enter Nit</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="id_book" type="text" value={id_book} onChange={(e) => setIdBook(e.target.value)} disabled/>
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
          <input id="dateReturn" className="input" type="date" name="date_end_reservation" value={date_end_reservation} onChange={(e) => setDateEndReservation(e.target.value)} required/>
        </div>

        <div className="input-container">
          <input className="input" name="status" type="text" value={status} onChange={(e) => setStatusReservation(e.target.value)} required/>
          <label className="label" htmlFor="input">Enter Status</label>
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
