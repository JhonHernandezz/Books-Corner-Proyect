import React, { useEffect, useState } from 'react'
import '../Styles/StylesApartados.css'

import Update from './components/Update';
import Add from './components/Add';

export default function Book({ role }) {
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);

  let [newArrayBook, setNewArrayBook] = useState([])
  let [dataFilter, setDataFilter] = useState([])

  let [searchName, setSearchName] = useState('')
  let [searchAuthor, setSearchAuthor] = useState('')
  let [searchEditorial, setSearchEditorial] = useState('')
  let [searchCategory, setSearchCategory] = useState('');

  let [id, setId] = useState('');

  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
  let token = localStorage.getItem('token')

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

  let eliminarRegistro = async(id) => {
    try {
      let config = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'Accept-Version': '3.0.0'
        }
      };
  
      await fetch(`http://${url.hostname}:${url.port}/book/delete/${id}`, config);
      alert('Registro eliminado con éxito');
      consultaTabla()
    } catch (error) {
      alert(error)
    }
  }

  let consultaTabla = async () => {
    let config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        "Accept-Version": "3.0.0"
      }
    }
    let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/book`, config)).json()
    setNewArrayBook(respuesta)
  }

  useEffect(() => { consultaTabla() }, [])

  let filterData = () => {
    let filtro = newArrayBook.filter(data => {
      let dataName = data.name.toLowerCase()
      let dataAutor = data.autor.toLowerCase()
      let dataEditorial = data.editorial.toLocaleLowerCase()
      let dataCategory = data.categorie.toLowerCase();

      return (
        dataName.includes(searchName.toLowerCase()) &&
        dataAutor.includes(searchAuthor.toLocaleLowerCase()) &&
        dataEditorial.includes(searchEditorial.toLocaleLowerCase()) &&
        (searchCategory === '' || dataCategory.includes(searchCategory.toLowerCase()))

      )
    })
    setDataFilter(filtro)
  }

  useEffect(() => { filterData() }, [newArrayBook, searchName, searchAuthor, searchEditorial, searchCategory])

  let userContent;

  if (role === 'ADMIN') {
    userContent = (
      <div className='contentUser'>
        <h3>BOOKS</h3>
        <div className='funcionesUser'>
          <button className='botonAgregar'>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="btnAdd" onClick={handleAddClicked}>Add</span>
          </button>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} name="text" className="input__search" placeholder="Search by Name" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)} name="text" className="input__search" placeholder="Search by Author" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchEditorial} onChange={(e) => setSearchEditorial(e.target.value)} name="text" className="input__search" placeholder="Search by Editorial" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="input__search" name="editorial">
              <option value="">Search by Category</option>
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
          </div>
        </div>
        <div className='Tabla'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Author</th>
                <th>Year of publication</th>
                <th>Categorie</th>
                <th>Sinopsis</th>
                <th>Editorial</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {dataFilter.map((val, id) => (
                <tr key={id}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.autor}</td>
                  <td>{val.year_of_publication}</td>
                  <td>{val.categorie}</td>
                  <td>{val.sinopsis}</td>
                  <td>{val.editorial}</td>
                  <td>{val.status}</td>
                  <td>{val.quantity}</td>
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
          <h3>BOOKS</h3>
          <Update id = {id} />
        </div>
      );
    } else if (isAddClicked) {
      userContent = (
        <div className='contentUser'>
          <h3>BOOKS</h3>
          <Add />
        </div>
      );
    }
  } else if (role === 'EMPLOYEE') {
    userContent = (
      <div className='contentUser'>
        <h3>BOOKS</h3>
        <div className='funcionesUser'>
          <button className='botonAgregar'>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="btnAdd" onClick={handleAddClicked}>Add</span>
          </button>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} name="text" className="input__search" placeholder="Search by Name" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)} name="text" className="input__search" placeholder="Search by Author" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <input type="text" value={searchEditorial} onChange={(e) => setSearchEditorial(e.target.value)} name="text" className="input__search" placeholder="Search by Editorial" />
          </div>
          <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow"></button>
            <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="input__search" name="editorial">
              <option value="">Search by Category</option>
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
          </div>
        </div>
        <div className='Tabla'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Author</th>
                <th>Year of publication</th>
                <th>Categorie</th>
                <th>Sinopsis</th>
                <th>Editorial</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {dataFilter.map((val, id) => (
                <tr key={id}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.autor}</td>
                  <td>{val.year_of_publication}</td>
                  <td>{val.categorie}</td>
                  <td>{val.sinopsis}</td>
                  <td>{val.editorial}</td>
                  <td>{val.status}</td>
                  <td>{val.quantity}</td>
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
          <h3>BOOKS</h3>
          <Update id = {id} />
        </div>
      );
    } else if (isAddClicked) {
      userContent = (
        <div className='contentUser'>
          <h3>BOOKS</h3>
          <Add />
        </div>
      );
    }
  }

  return userContent;
}
