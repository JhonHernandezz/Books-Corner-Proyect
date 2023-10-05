import React, { useEffect, useState } from 'react'
import './User.css'

import Update from './components/Update';
import Add from './components/Add';
import AddEmployee from './components/AddEmployee';

export default function User({ role }) {
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isAddClickedEmployee, setIsAddClickedEmployee] = useState(false);

  // Estados en donde se va a guardar la informacion que se digita en los input
  const [searchRole, setSearchRole] = useState('');
  const [searchNit, setSearchNit] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  // --------------------------------------------------------------------------

  const [nit, setNit] = useState('');

  // Aca se guarda el array que se trae de la consulta para pintar la tabla
  const [newArrayTabla, setNewArrayTabla] = useState([])
  const [newArrayTablaEmployee, setNewArrayTablaEmployee] = useState([])
  // ----------------------------------------------------------------------

  // Nuevo array que vamos a mapear para pintar la tabla 
  const [filtereData, setFiltereData] = useState([]);
  let [filterDataTableEmployee, setFilterDataEmployee] = useState([])
  // ---------------------------------------------------

  // Importacion de las variables de entorno del servidor
  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
  // ----------------------------------------------------

  // Se trae el token que hay en el local storage
  let token = localStorage.getItem('token')
  // --------------------------------------------

  const handleAddClicked = () => {
    setIsAddClicked(true);
  };

  const handleAddClickedEmployee = () => {
    setIsAddClickedEmployee(true);
  };

  const handleUpdateClick = (nit) => {
    setNit(nit)
    setIsUpdateClicked(true);
  };

  // Eliminar el registro
  const handleDeleteClick = (nit) => {
    let confirmar = window.confirm('Esta seguro que quiere eliminar este registro?')
    if (confirmar) {
      eliminarRegistro(nit)
    }
  };

  let eliminarRegistro = async (nit) => {
    try {
      let config = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'Accept-Version': '3.0.0'
        }
      };

      await fetch(`http://${url.hostname}:${url.port}/user/delete/${nit}`, config);
      alert('Registro eliminado con éxito');
      consultaTabla()
    } catch (error) {
      alert('Error al eliminar el registro');
    }
  };
  // --------------------

  // Pintar la tabla
  let consultaTabla = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          "Accept-Version": "3.0.0"
        }
      }
      let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/user`, config)).json()
      setNewArrayTabla(respuesta)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => { consultaTabla() }, []);

  const filterData = () => {
    const filtro = newArrayTabla.filter(data => {
      const dataRole = data.role.toLowerCase();
      const dataNit = data.nit.toString();
      const dataName = data.name.toLowerCase();
      const dataEmail = data.email.toLowerCase();
      return (
        (searchRole === '' || dataRole.includes(searchRole.toLowerCase())) &&
        dataNit.includes(searchNit.toString()) &&
        dataName.includes(searchName.toLowerCase()) &&
        dataEmail.includes(searchEmail.toLowerCase())
      )
    })
    setFiltereData(filtro);
  };

  useEffect(() => { filterData() }, [newArrayTabla, searchRole, searchNit, searchName, searchEmail]);
  // -----------------

    // Pintar la tabla Employee
    let consultaTablaEmployee = async () => {
      try {
        let config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            "Accept-Version": "2.0.0"
          }
        }
        let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/user`, config)).json()
        setNewArrayTablaEmployee(respuesta)
      } catch (error) {
        alert(error);
      }
    }
  
    useEffect(() => { consultaTablaEmployee() }, []);

    const filterDataEmployee = () => {
      const filtro = newArrayTablaEmployee.filter(data => {
        const dataNit = data.nit.toString();
        const dataName = data.name.toLowerCase();
        const dataEmail = data.email.toLowerCase();
        return (
          dataNit.includes(searchNit.toString()) &&
          dataName.includes(searchName.toLowerCase()) &&
          dataEmail.includes(searchEmail.toLowerCase())
        )
      })
      setFilterDataEmployee(filtro);
    };
  
    useEffect(() => { filterDataEmployee() }, [newArrayTablaEmployee, searchNit, searchName, searchEmail]);
    // -----------------

  let userContent;

  if (role === 'ADMIN') {
    userContent = (
      <div className='contentUser'>
        <h3>USERS</h3>
        <div className='funcionesUser'>
          <button className='botonAgregar'>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="btnAdd" onClick={handleAddClicked}>+</span>
          </button>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <select value={searchRole} onChange={(e) => setSearchRole(e.target.value)} className="input__search" name="status">
              <option value="">Search by Category</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="number" value={searchNit} onChange={(e) => setSearchNit(e.target.value)} className="input__search" placeholder="Search by NIT" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="input__search" placeholder="Search by Name" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} className="input__search" placeholder="Search by Email" />
          </div>
        </div>
        <div className='Tabla'>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>NIT</th>
                <th>Password</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filtereData.map((val, id) => (
                <tr key={id}>
                  <td>{val.role}</td>
                  <td>{val.nit}</td>
                  <td>{val.password}</td>
                  <td>{val.name}</td>
                  <td>{val.phone}</td>
                  <td>{val.address}</td>
                  <td>{val.email}</td>
                  <td>
                    <button className="buttonUpdateClic" role="buttonUpdateClic" onClick={() => handleUpdateClick(val.nit)}>Update</button>
                    <button className="buttonDeleteClic" role="buttonDeleteClic" onClick={() => handleDeleteClick(val.nit)}>Delete</button>
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
          <h3>USERS</h3>
          <Update nit={nit} />
        </div>
      );
    } else if (isAddClicked) {
      userContent = (
        <div className='contentUser'>
          <h3>USERS</h3>
          <Add />
        </div>
      );
    }
  } else if (role === 'EMPLOYEE') {
    userContent = (
      <div className='contentUser'>
        <h3>USERS</h3>
        <div className='funcionesUser'>
          <button className='botonAgregar'>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="btnAdd" onClick={handleAddClickedEmployee}>+</span>
          </button>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="number" value={searchNit} onChange={(e) => setSearchNit(e.target.value)} className="input__search" placeholder="Search by NIT" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="input__search" placeholder="Search by Name" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} className="input__search" placeholder="Search by Email" />
          </div>
        </div>
        <div className='Tabla'>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>NIT</th>
                <th>Password</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filterDataTableEmployee.map((val, id) => (
                <tr key={id}>
                  <td>{val.role}</td>
                  <td>{val.nit}</td>
                  <td>{val.password}</td>
                  <td>{val.name}</td>
                  <td>{val.phone}</td>
                  <td>{val.address}</td>
                  <td>{val.email}</td>
                  <td>
                    <button className="buttonUpdateClic" role="buttonUpdateClic" onClick={() => handleUpdateClick(val.nit)}>Update</button>
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
          <h3>USERS</h3>
          <Update nit={nit} />
        </div>
      );
    } else if (isAddClickedEmployee) {
      userContent = (
        <div className='contentUser'>
          <h3>USERS</h3>
          <AddEmployee />
        </div>
      );
    }
  }

  return userContent;
}