import React, { useEffect, useState } from 'react'

import '../Styles/StylesApartados.css'

import Update from './components/Update';
import Add from './components/Add';

export default function Loan({ role }) {
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);

  let [newArrayLoan, setNewArrayLoan] = useState([])
  let [arraySearch, setArraySearch] = useState([])

  let [searchNit, setSearchNit] = useState('')
  let [searchDateLoan, setSearchDateLoan] = useState('')
  let [searchDateReturn, setSearchDateReturn] = useState('')
  let [searchState, setSearchState] = useState('')

  let [id, setId] = useState('')

  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
  let token = localStorage.getItem('token')

  const handleAddClicked = () => {
    setIsAddClicked(true);
  };

  const handleUpdateClick = (id) => {
    setId(id)
    setIsUpdateClicked(true);
  };

  let handleDeleteClick = (id) => {
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

      await fetch(`http://${url.hostname}:${url.port}/loan/delete/${id}`, config);
      alert('Registro eliminado con éxito');
      pintarTablaLoan()
    } catch (error) {
      alert('Error al eliminar el registro');
    }
  };

  let pintarTablaLoan = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          "Accept-Version": "3.0.0"
        }
      }
      let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/loan/getAllLoan`, config)).json()
      setNewArrayLoan(respuesta)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => { pintarTablaLoan() }, [])

  let filterData = () => {
    let filter = newArrayLoan.filter(data => {
      let dataNit = data.nit_client.toString()
      let dataLoan = data.date_loan.toLowerCase()
      let dataReturn = data.date_return.toLowerCase()
      let status = data.status.toLowerCase()
      return(
        dataNit.includes(searchNit.toString()) &&
        dataLoan.includes(searchDateLoan.toLocaleLowerCase()) &&
        dataReturn.includes(searchDateReturn.toLocaleLowerCase()) &&
        (searchState === '' || status.includes(searchState.toLowerCase()))
      )
    })
    setArraySearch(filter)
  }

  useEffect(() => { filterData() }, [newArrayLoan, searchNit, searchDateLoan, searchDateReturn, searchState])

  let userContent;

  if (role === 'ADMIN') {
    userContent = (
      <div className='contentUser'>
        <h3>LOAN</h3>
        <div className='funcionesUser'>
          <button className='botonAgregar'>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="btnAdd" onClick={handleAddClicked}>Add</span>
          </button>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="number" value={searchNit} onChange={(e) => setSearchNit(e.target.value)} name="text" className="input__search" placeholder="Search by Nit" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <label htmlFor="dateInput" className="input__label">Search by date loan</label>
            <input type="date" id="dateInput" value={searchDateLoan} onChange={(e) => setSearchDateLoan(e.target.value)} name="text" className="input__search" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <label htmlFor="dateInput" className="input__label">Search by date return</label>
            <input type="date" id="dateInput" value={searchDateReturn} onChange={(e) => setSearchDateReturn(e.target.value)} name="text" className="input__search" />
          </div>

          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <select value={searchState} onChange={(e) => setSearchState(e.target.value)} className="input__search" name="status">
              <option value="">Search by Category</option>
              <option value="Loan">Loan</option>
              <option value="Return">Return</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

        </div>
        <div className='Tabla'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NIT</th>
                <th>Books</th>
                <th>Date Loan</th>
                <th>Date Return</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {arraySearch.map((val, id) => (
                <tr key={id}>
                  <td>{val.id}</td>
                  <td>{val.nit_client}</td>
                  <td>{val.count_book.join(', ')}</td>
                  <td>{val.date_loan}</td>
                  <td>{val.date_return}</td>
                  <td>{val.status}</td>
                  <td>{val.cost}</td>
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
          <h3>LOAN</h3>
          <Update id = {id}/>
        </div>
      );
    } else if (isAddClicked) {
      userContent = (
        <div className='contentUser'>
          <h3>LOAN</h3>
          <Add />
        </div>
      );
    }
  } else if (role === 'EMPLOYEE') {
    userContent = (
      <div className='contentUser'>
        <h3>LOAN</h3>
        <div className='funcionesUser'>
          <button className='botonAgregar'>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="btnAdd" onClick={handleAddClicked}>Add</span>
          </button>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="number" value={searchNit} onChange={(e) => setSearchNit(e.target.value)} name="text" className="input__search" placeholder="Search by Nit" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <label htmlFor="dateInput" className="input__label">Search by date loan</label>
            <input type="date" id="dateInput" value={searchDateLoan} onChange={(e) => setSearchDateLoan(e.target.value)} name="text" className="input__search" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <label htmlFor="dateInput" className="input__label">Search by date return</label>
            <input type="date" id="dateInput" value={searchDateReturn} onChange={(e) => setSearchDateReturn(e.target.value)} name="text" className="input__search" />
          </div>

          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <select value={searchState} onChange={(e) => setSearchState(e.target.value)} className="input__search" name="status">
              <option value="">Search by Category</option>
              <option value="Loan">Loan</option>
              <option value="Return">Return</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

        </div>
        <div className='Tabla'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NIT</th>
                <th>Books</th>
                <th>Date Loan</th>
                <th>Date Return</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {arraySearch.map((val, id) => (
                <tr key={id}>
                  <td>{val.id}</td>
                  <td>{val.nit_client}</td>
                  <td>{val.count_book.join(', ')}</td>
                  <td>{val.date_loan}</td>
                  <td>{val.date_return}</td>
                  <td>{val.status}</td>
                  <td>{val.cost}</td>
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
          <h3>LOAN</h3>
          <Update id = {id}/>
        </div>
      );
    } else if (isAddClicked) {
      userContent = (
        <div className='contentUser'>
          <h3>LOAN</h3>
          <Add />
        </div>
      );
    }
  } 

  return userContent;
}
