import React, { useEffect, useState } from 'react'

import '../Styles/StylesApartados.css'

import Update from './components/Update';
import Add from './components/Add';

export default function Reservate({ role }) {

  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
  let token = localStorage.getItem('token')

  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);

  let [newArrayReservate, setNewArrayReservate] = useState([])
  let [arraySearch, setArraySearch] = useState([])

  let [nit, setNit] = useState('')
  let [date_reservation, setDateReservation] = useState('')
  let [date_end_reservation, setDateEndReservation] = useState('')
  let [searchStatus, setStatus] = useState('')

  let [id, setId] = useState('')

  const handleAddClicked = () => {
    setIsAddClicked(true);
  };

  const handleUpdateClick = (id) => {
    setId(id)
    setIsUpdateClicked(true);
  };

  const handleDeleteClick = (id) => {
    let confirmar = window.confirm('Esta seguro que quiere eliminar este registro?')
    if (confirmar) {
      eliminarRegistro(id)
    }
  };

  let eliminarRegistro = async (id) => {
    try {
      let config = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'Accept-Version': '3.0.0'
        }
      };

      await fetch(`http://${url.hostname}:${url.port}/reservation/delete/${id}`, config);
      alert('Registro eliminado con éxito');
      pintarTablaReservate()
    } catch (error) {
      alert('Error al eliminar el registro');
    }
  };

  let pintarTablaReservate = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          "Accept-Version": "3.0.0"
        }
      }
      let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/reservation`, config)).json()
      setNewArrayReservate(respuesta)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => { pintarTablaReservate() }, [])

  let filterData = () => {
    let filter = newArrayReservate.filter(data => {
      let dataNit = data.nit_client.toString()
      let dataReservation = data.date_reservation.toLowerCase()
      let dataEndReservation = data.date_end_reservation.toLowerCase()
      let status = data.status.toLowerCase()
      return(
        dataNit.includes(nit.toString()) &&
        dataReservation.includes(date_reservation.toLocaleLowerCase()) &&
        dataEndReservation.includes(date_end_reservation.toLocaleLowerCase()) &&
        (searchStatus === '' || status.includes(searchStatus.toLowerCase()))
      )
    })
    setArraySearch(filter)
  }

  useEffect(() => { filterData() }, [newArrayReservate, nit, date_reservation, date_end_reservation, searchStatus])

  let userContent;

  if (role === 'ADMIN') {
    userContent = (
      <div className='contentUser'>
        <h3>RESERVATE</h3>
        <div className='funcionesUser'>
          <button className='botonAgregar'>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="btnAdd" onClick={handleAddClicked}>+</span>
          </button>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="number" name="nit" value={nit} onChange={(e) => setNit(e.target.value)} className="input__search" placeholder="Search by Nit" />
          </div>

          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <label htmlFor="dateInput" className="input__label">Search by date loan</label>
            <input type="date" id="dateInput" value={date_reservation} onChange={(e) => setDateReservation(e.target.value)} name="date_reservation" className="input__search" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <label htmlFor="dateInput" className="input__label">Search by date return</label>
            <input type="date" id="dateInput" value={date_end_reservation} onChange={(e) => setDateEndReservation(e.target.value)} name="date_end_reservation" className="input__search" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <select value={searchStatus} onChange={(e) => setStatus(e.target.value)} className="input__search" name="status">
              <option value="">Search by Category</option>
              <option value="Reserved">Reserved</option>
              <option value="Cancelled reservation">Cancelled reservation</option>
              <option value="Loan">Loan</option>
            </select>
          </div>
        </div>
        <div className='Tabla'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NIT</th>
                <th>Book</th>
                <th>Date Reservation</th>
                <th>Date End Reservation</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {arraySearch.map((val, id) => (
                <tr key={id}>
                  <td>{val.id}</td>
                  <td>{val.nit_client}</td>
                  <td>{val.id_book}</td>
                  <td>{val.date_reservation}</td>
                  <td>{val.date_end_reservation}</td>
                  <td>{val.status}</td>
                  <td>
                    <button className="buttonUpdateClic" role="buttonUpdateClic" onClick={() => handleUpdateClick(val.id)}>Update</button>
                    <button className="buttonDeleteClic" role="buttonDeleteClic" onClick={() => handleDeleteClick(val.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    if (isUpdateClicked) {
      userContent = (
        <div className='contentUser'>
          <h3>RESERVATE</h3>
          <Update id = {id}/>
        </div>
      );
    } else if (isAddClicked) {
      userContent = (
        <div className='contentUser'>
          <h3>RESERVATE</h3>
          <Add />
        </div>
      );
    }
  } else {
    userContent = (
      <div className='contentUser'>
        <h3>RESERVATE</h3>
        <div className='funcionesUser'>
          <button className='botonAgregar'>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="btnAdd" onClick={handleAddClicked}>+</span>
          </button>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="number" name="nit" value={nit} onChange={(e) => setNit(e.target.value)} className="input__search" placeholder="Search by Nit" />
          </div>

          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <label htmlFor="dateInput" className="input__label">Search by date loan</label>
            <input type="date" id="dateInput" value={date_reservation} onChange={(e) => setDateReservation(e.target.value)} name="date_reservation" className="input__search" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <label htmlFor="dateInput" className="input__label">Search by date return</label>
            <input type="date" id="dateInput" value={date_end_reservation} onChange={(e) => setDateEndReservation(e.target.value)} name="date_end_reservation" className="input__search" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <select value={searchStatus} onChange={(e) => setStatus(e.target.value)} className="input__search" name="status">
              <option value="">Search by Category</option>
              <option value="Reserved">Reserved</option>
              <option value="Cancelled reservation">Cancelled reservation</option>
              <option value="Loan">Loan</option>
            </select>
          </div>
        </div>
        <div className='Tabla'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NIT</th>
                <th>Book</th>
                <th>Date Reservation</th>
                <th>Date End Reservation</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {arraySearch.map((val, id) => (
                <tr key={id}>
                  <td>{val.id}</td>
                  <td>{val.nit_client}</td>
                  <td>{val.id_book}</td>
                  <td>{val.date_reservation}</td>
                  <td>{val.date_end_reservation}</td>
                  <td>{val.status}</td>
                  <td>
                    <button className="buttonUpdateClic" role="buttonUpdateClic" onClick={() => handleUpdateClick(val.id)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    if (isUpdateClicked) {
      userContent = (
        <div className='contentUser'>
          <h3>RESERVATE</h3>
          <Update id = {id}/>
        </div>
      );
    } else if (isAddClicked) {
      userContent = (
        <div className='contentUser'>
          <h3>RESERVATE</h3>
          <Add />
        </div>
      );
    }
  }

  return userContent;
}
