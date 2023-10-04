import React, { useEffect, useState } from 'react'
import '../../Styles/StylesApartados.css'

export default function Update({ id }) {

  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
  let token = localStorage.getItem('token')

  const [nit_client, setNit] = useState('');
  const [count_book, setCountBook] = useState([]);
  const [date_loan, setDateLoan] = useState('');
  const [date_return, setDateReturn] = useState('');
  const [status, setStatus] = useState('');
  const [cost, setCost] = useState('');

  let pintarInputs = async () => {
    let config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Accept-Version': '3.0.0'
      }
    }

    let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/loan/getIdLoan/${id}`, config)).json()

    if (respuesta.length > 0) {
      const userData = respuesta[0];

      setNit(userData.nit_client);
      setCountBook(userData.count_book);
      setDateLoan(userData.date_loan);
      setDateReturn(userData.date_return);
      setStatus(userData.status);
      setCost(userData.cost);
    }
  }

  useEffect(() => { pintarInputs() }, [])

  let handleCountBook = (e) => {
    let value = e.target.value
    let countBookArray = value.split(',').map(item => item.trim())
    setCountBook(countBookArray)
  }

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
        body: JSON.stringify({ nit_client, count_book, date_loan, date_return, status, cost })
      }
  
      let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/loan/update/${id}`, config)).json()
       
      if (respuesta.status === 200) {
        alert('Registro actualizado con éxito.')
        window.location.reload()
      } else {
        alert(respuesta.message)
      }
    } catch (error) {
      alert(error)
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

      <form onSubmit={handleActualizar} className='formAddAndPut'>
        <div className="input-container">
          <input className="input" name="nit_client" type="number" value={nit_client} onChange={(e) => setNit(e.target.value)} disabled />
          <label className="label" htmlFor="input">Enter Nit</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="count_book" type="text" value={count_book.join(', ')} onChange={handleCountBook} disabled />
          <label className="label" htmlFor="input">Enter Count Book</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" type="date" name="date_loan" value={date_loan} onChange={(e) => setDateLoan(e.target.value)} required/>
          <label className="label" htmlFor="fecha">Enter Date Loan</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" type="date" name="date_return" value={date_return} onChange={(e) => setDateReturn(e.target.value)} required />
          <label className="label" htmlFor="fecha">Enter Date Return</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" type="text" name="status" value={status} onChange={(e) => setStatus(e.target.value)} required />
          <label className="label" htmlFor="fecha">Enter Status</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="text" type="number" value={cost} onChange={(e) => setCost(e.target.value)} required />
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
