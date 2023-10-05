import React, { useEffect, useState } from 'react'
import '../../Styles/StylesApartados.css'

export default function Update({ id }) {

  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
  let token = localStorage.getItem('token')

  let [name, setName] = useState('')
  let [photo, setPhoto] = useState('')
  let [autor, setAutor] = useState('')
  let [year_of_publication, setYearOfPublication] = useState('')
  let [categorie, setCategorie] = useState('')
  let [sinopsis, setSinopsis] = useState('')
  let [editorial, setEditorial] = useState('')
  let [status, setStatus] = useState('')
  let [quantity, setQuantity] = useState('')

  let pintarInputs = async () => {
    let config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Accept-Version': '3.0.0'
      }
    }

    let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/book/id/${id}`, config)).json()
    console.log(respuesta);

    if (respuesta.length > 0) {
      const userData = respuesta[0];

      setName(userData.name);
      setPhoto(userData.photo);
      setAutor(userData.autor);
      setYearOfPublication(userData.year_of_publication);
      setCategorie(userData.categorie);
      setSinopsis(userData.sinopsis);
      setEditorial(userData.editorial);
      setStatus(userData.status);
      setQuantity(userData.quantity);
    }
  }

  useEffect(() => { pintarInputs() }, [])

  const handleActualizar = async(e) => {
    e.preventDefault()

    let config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        "Accept-Version": "3.0.0",
      },
      body: JSON.stringify({ name, photo, autor, year_of_publication, categorie, sinopsis, editorial, status, quantity })
    }

    let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/book/update/${id}`, config)).json()

    if (respuesta.status === 200) {
      alert('Registro actualizado con éxito.')
      window.location.reload()
    } else {
      alert(respuesta.message)
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
          <input className="input" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          <label className="label" htmlFor="input">Enter Name</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="photo" type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} required/>
          <label className="label" htmlFor="input">Enter Photo</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="autor" type="text" value={autor} onChange={(e) => setAutor(e.target.value)} required/>
          <label className="label" htmlFor="input">Enter Author</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="year_of_publication" type="number" value={year_of_publication} onChange={(e) => setYearOfPublication(e.target.value)} required/>
          <label className="label" htmlFor="input">Enter Year of publication</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <select className="input" name="categorie" disabled>
            <option value={categorie} onChange={(e) => setCategorie(e.target.value)}>{categorie}</option>
          </select>
          <label className="label" htmlFor="select">Select a category</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="sinopsis" type="text" value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} required/>
          <label className="label" htmlFor="input">Enter Sinopsis</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="text" type="text" value={editorial} onChange={(e) => setEditorial(e.target.value)} required />
          <label className="label" htmlFor="input">Enter Editorial</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <select className="input" name="status" disabled>
            <option value={status} onChange={(e) => setStatus(e.target.value)}>{status}</option>
          </select>
          <label className="label" htmlFor="select">Select a status</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
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
